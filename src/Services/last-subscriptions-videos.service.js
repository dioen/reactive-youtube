import { YoutubeUserSubscriptionsService } from './youtube-user-subscriptions.service';
import { YoutubeChannelLastVideosService } from './youtube-channel-last-videos.service';

export class LastSubscriptionsVideosService {
    constructor() {
        this._YoutubeUserSubscriptionsService = new YoutubeUserSubscriptionsService();
        this._YoutubeChannelLastVideosService = new YoutubeChannelLastVideosService();
    }

    queryChannelsForLastVideos() {
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

    getUserSubscriptions = () => {
        return this._YoutubeUserSubscriptionsService.getUserSubscriptionsTo();
    }

    getChannelVideos = (channelId) => {
        return this._YoutubeChannelLastVideosService.getLastChannelVideos(channelId);
    }

    promiseAllRequests = (requestsArray) => {
        return Promise.all(requestsArray);
    }
}