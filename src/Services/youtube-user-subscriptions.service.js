export class YoutubeUserSubscriptionsService {
    constructor() { }

    settings = () => ({
        apiKey: 'AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM'
    });

    getUserSubscriptionsTo = () => {
        const { apiKey } = this.settings();
        const googleSubscriptionsApi = this.subscriptionsCallsFactory({ apiKey });
        const result = googleSubscriptionsApi();

        return result.then(response => {
            let subscriptions;

            if (response.pageInfo.totalResults < 50) {
                subscriptions = response.items;
            } else {
                subscriptions = [];
                const neededCallsCount = this.calcNeededCalls(response.totalResults);

                for (let i = 0; i <= neededCallsCount; i++) {
                    subscriptions = [...subscriptions, this.subscriptionsCallsFactory({ googleQueryUrl, apiKey })];
                }
            }
            return Promise.resolve(subscriptions);
        });
    }

    subscriptionsCallsFactory = ({ apiKey }) => {
        let pageToken = '';
        return () => {
            const request = gapi.client.request({
                'path': '/youtube/v3/subscriptions/',
                'method': 'GET',
                'params': {
                    'part': 'snippet,contentDetails',
                    'mine': 'true',
                    'maxResults': '50',
                    'key': apiKey
                }
            });
            return request.then(response => {
                pageToken = response.result.nextPageToken;
                return Promise.resolve(response.result);
            });
        }
    }

    calcNeededCalls = (subscriptionsCount) => {
        return Math.ceil(subscriptionsCount / 50);
    }
}