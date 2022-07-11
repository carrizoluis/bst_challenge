import { Injectable } from "@nestjs/common";

@Injectable()
export class BinaryTreeService{
    
        
    constructor(){}


    /** It initializes the tree with an array of numbers.
     * 
     */
    create(numbers: number[]): void {}

    /** Insert a number into the tree.
     * 
     * @param number
     */
    insert(number: number): void {}
    
    /** This method returns a requested value. It searchs in the tree.
     * 
     * @param value Number to search
     * @returns String with value and depth.
     */
    search(value: number): string {
        return null;
    }

    /** This method returns the deeper node
     * 
     * @returns String with the value and the depht.
     */
    deeper(): string {
        return null;
    }

}