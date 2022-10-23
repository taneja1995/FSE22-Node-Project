import Bookmark from "../models/Bookmark";


export default interface BookmarkDao{

    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit (uid: string, tid:string): Promise<any>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;

};