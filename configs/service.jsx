import axios from "axios";

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const getVideos=async(courseName, chapterName)=> {
    // Combine course name and chapter name for more specific search
    const searchQuery = `${courseName} ${chapterName} tutorial`;
    
    const params={
        part: 'snippet',
        q: searchQuery,                      
        type: 'video',
        maxResults: 5, // Get top 5 results
        order: 'relevance', // Sort by relevance (YouTube's algorithm considers likes, views, engagement)
        videoDefinition: 'any',
        videoDuration: 'medium', // Get medium length videos (4-20 minutes)
        relevanceLanguage: 'en', // English videos
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }
    const response=await axios.get(YOUTUBE_BASE_URL,{params});
    return response.data.items;
}

export default{
    getVideos
}