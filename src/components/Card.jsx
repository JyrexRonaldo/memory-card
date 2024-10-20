function Card({imgUrl, imgName}) {
    return (
        <div>
        <img src={imgUrl} alt="" />
        <p>{imgName}</p>
        </div>
    )
}


export { Card }