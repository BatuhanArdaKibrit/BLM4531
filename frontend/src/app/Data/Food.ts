export default interface Food{
    id:number
    name:string
    type:string
    image:Blob
    recipe:string
    ingredients:Array<string>
    createdBy:string
    imageName:string
    imageType?:string
    isLiked?:boolean
    isDeletable?:boolean
}