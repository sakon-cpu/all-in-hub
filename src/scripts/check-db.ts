import { Redis } from '@upstash/redis';

const url = "https://moved-octopus-67849.upstash.io";
const token = "gQAAAAAAAQkJAAIncDFhYTI2ODE0YWY2Zjg0ZDBmODI5M2RiMDgxYzhkMDEzNXAxNjc4NDk";
const redis = new Redis({ url, token });

async function check() {
    const works = await redis.get('works');
    const news = await redis.get('news');
    const notes = await redis.get('notes');
    
    console.log("--- Current Database State ---");
    console.log("Works:", Array.isArray(works) ? works.length : "Not an array");
    console.log("News:", Array.isArray(news) ? news.length : "Not an array");
    console.log("Notes:", Array.isArray(notes) ? notes.length : "Not an array");
    
    if (Array.isArray(works) && works.length > 0) {
        console.log("Sample Work Title:", works[0].titleJa || works[0].title);
    }
}

check().catch(console.error);
