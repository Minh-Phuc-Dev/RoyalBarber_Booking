import api, {requestApiHelper} from "@src/apis/index.js";


class MediaService {
    
    static uploadMedia(form) {
        return requestApiHelper(
            api.post(
                "media",
                form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        )
    }
    
    static getMedia(link) {
        return `${import.meta.env.VITE_API_BASE_URL}/api/media/${link.replaceAll("/", "")}`;
    }

}

export default MediaService;