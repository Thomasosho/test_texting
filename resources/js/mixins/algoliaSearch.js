import algoliasearch from "algoliasearch/lite";
import AppInfiniteHits from "../components/InfiniteHits";
import {
    AisInstantSearch,
    AisSearchBox,
    AisConfigure
} from "vue-instantsearch";

export default {
    components: {
        AppInfiniteHits,
        AisInstantSearch,
        AisSearchBox,
        AisConfigure
    },
    filters: {
        getAvatar: path => {
            return "/" + path.substr(17, path.length);
        }
    },
    data() {
        const algoliaClient = algoliasearch(
            process.env.MIX_ALGOLIA_APP_ID,
            process.env.MIX_ALGOLIA_SECRET
        );
        const searchClient = {
            search(requests) {
                if (requests.every(({ params }) => !params.query)) {
                    return Promise.resolve({
                        results: requests.map(() => ({
                            hits: [],
                            nbHits: 0,
                            nbPages: 0,
                            processingTimeMS: 0
                        }))
                    });
                }

                return algoliaClient.search(requests);
            }
        };

        return {
            searchClient
        };
    }
};