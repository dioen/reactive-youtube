export class YoutubeUserSubscriptionsService {
    constructor() {
        this.apiKey = 'AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM'
    }

    calcNeededCalls = (subscriptionsCount) => {
        return Math.ceil(subscriptionsCount / 50);
    }

    getUserSubscriptionsTo = () => {
        const googleSubscriptionsApi = this.subscriptionsCallsFactory();
        const result = googleSubscriptionsApi();

        return result.then(response => {
            let subscriptions;

            if (response.pageInfo.totalResults < 50) {
                subscriptions = response.items;
            } else {
                subscriptions = [];
                const neededCallsCount = this.calcNeededCalls(response.totalResults);

                for (let i = 0; i <= neededCallsCount; i++) {
                    subscriptions = [...subscriptions, this.subscriptionsCallsFactory()];
                }
            }
            return Promise.resolve(subscriptions);
        });
    }

    subscriptionsCallsFactory = () => {
        return () => {
            const request = gapi.client.request({
                'path': '/youtube/v3/subscriptions/',
                'method': 'GET',
                'params': {
                    'part': 'snippet,contentDetails',
                    'mine': 'true',
                    'maxResults': '50',
                    'key': this.apiKey
                }
            });
            return request.then(response => {
                return Promise.resolve(response.result);
            });
        }
    }
}
