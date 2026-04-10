import * as Sentry from '@sentry/react';

if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        sendDefaultPii: true,
        integrations: [
            Sentry.replayIntegration({
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],
        replaysOnErrorSampleRate: 1.0,
    });
}
