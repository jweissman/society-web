import axios from 'axios';
import timeout from '../util/timeout';

export class PhotoService {
    static timeoutWarning =
        "We are enforcing a 3s timeout after calls to findPhoto."
    apiBase: string = 'https://source.unsplash.com';
    async findPhoto(...keywords: string[]): Promise<string> {
        let sz = '1080x720';
        let uri = `${this.apiBase}/random/${sz}/?${keywords.join('+')}`;
        let response = await axios.get(uri)
        let fetchedUrl = response.request.responseURL
        console.log("Found a good photo", { photoUrl: fetchedUrl })
        console.warn(PhotoService.timeoutWarning)
        await timeout(3000)
        return fetchedUrl
    }
}

let svc = new PhotoService()
export default svc;