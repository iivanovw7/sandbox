---
title: Retrying data fetch in Angular 4
description: Angular component with customizable retrying function calls, done with…
date: 2022-03-02T20:10:47.688Z
author: iivanovw7
layout: ../../templates/BasePost.astro
tags:
    - js
    - angular
    - rx
    - observables
draft: true
---

#### Usage example in component:

```typescript
import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import 'rxjs/add/observable/of';
import * as _ from 'underscore';
import { ServiceProvider } from '../../shared';

@Component({
    selector: 'example-component',
    templateUrl: './example-component.html',
    styleUrls: ['./example-component.scss'],
    providers: [ServiceProvider]
})

export class ExampleComponent implements AfterContentInit, OnDestroy {
    authCode = 'XXXX';
    authCodeSleep = 10000; // Delay before first code verification
    authCodeRetryDelay = 15000; // Delayed retry attempts
    authCodeRetryAttempts = 6;

    private stopTrying = new Subject<any>(); // Stops retrying to verify auth code
    private subscription: Subscription = new Subscription();

    constructor() {}

    // Starts trying to verify code
    ngAfterContentInit() {
        verifyAuthCode(this.authCode);
    }

    // Removes subscriptions and stops retrying verify code
    ngOnDestroy() {
        this.stopTrying.next(true);
        this.subscription.unsubscribe();
    }

    // Tries to verify code, if not verified - cleans old code
    verifyAuthCode(code: string) {
        const retryLimit = this.authCodeRetryAttempts - 1;
        const firstAttempt = Observable.of(null);
        const retryAttempt = Observable.interval(this.authCodeRetryDelay);
        const firstAttemptDelay = () => Observable.timer(this.authCodeSleep);

        const authCodeVerification = Observable.merge(
            firstAttempt.delayWhen(firstAttemptDelay).takeUntil(this.stopTrying),
            retryAttempt.delayWhen(firstAttemptDelay).takeUntil(this.stopTrying)
        );

        this.subscription.add(authCodeVerification.subscribe(async val => {
            const token = await this.getTokenByCode(code);
            if (token) {
                // In case of success pass recieved data in another function
                return this.authCodeVerificationSuccess(token);
            }
            if (val === retryLimit) {
                // Reached out max attempts limit
                return this.authCodeVerificationFailed();
            }
        }));
    }
}
```
