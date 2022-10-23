/**
 * @file Tuit2Tag data model
 */
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Tag
 * @property {string} tag
 * @property {tuit} Tuit
 */
export default class Tuit2Tag{
    private tag:String='';
    private tuit: Tuit | null= null;
}