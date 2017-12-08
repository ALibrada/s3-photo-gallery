function createUrl(Key) {
    if (process.env.NODE_ENV === 'production') {
        const S3 = require('aws-sdk/clients/s3');
        const {secretAccessKey, accessKeyId, region, Bucket} = require('../../config.json');
        const s3 = new S3({apiVersion: '2006-03-01', accessKeyId, secretAccessKey, region});
        return s3.getSignedUrl('getObject', {Bucket, Key});
    } else {
        return `http://localhost:8000/${Key}`;
    }
}

function throttle(func, wait = 100) {
    let timer = null;
    return function(...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}

export {
    createUrl,
    throttle
}
