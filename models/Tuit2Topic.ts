/**
 * @file Tuit2Topic data model
 */
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Topic
 * @property {string} topic
 * @property {Tuit} tuit
 */
export default class Tuit2Topic{

    private topic:string='';
    private tuit: Tuit | null =null;

}