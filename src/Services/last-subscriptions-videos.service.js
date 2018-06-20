import { YoutubeUserSubscriptionsService } from './youtube-user-subscriptions.service';
import { YoutubeChannelLastVideosService } from './youtube-channel-last-videos.service';

export class LastSubscriptionsVideosService {
    constructor() {
        this._YoutubeUserSubscriptionsService = new YoutubeUserSubscriptionsService();
        this._YoutubeChannelLastVideosService = new YoutubeChannelLastVideosService();
    }

    getChannelVideos = (channelId) => {
        return this._YoutubeChannelLastVideosService.getLastChannelVideos(channelId);
    }

    getUserSubscriptions = () => {
        return this._YoutubeUserSubscriptionsService.getUserSubscriptionsTo();
    }

    promiseAllRequests = (requestsArray) => {
        return Promise.all(requestsArray);
    }

    queryChannelsForLastVideos = () => {
        return this.getUserSubscriptions()
            .then(subscriptions => {
                return this.promiseAllRequests(
                    subscriptions.map(
                        subscription => this.getChannelVideos(subscription.snippet.resourceId.channelId)
                            .then(response => response.json())
                    )
                );
            });
    }
}
