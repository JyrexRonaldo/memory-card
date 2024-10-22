function Card({imgUrl, imgName, clickHandler}) {
    return (
        <div data-id={imgName} onClick={clickHandler}>
        <img data-id={imgName} src={imgUrl} alt="" />
        <p data-id={imgName}>{imgName}</p>
        </div>
    )
}


export { Card }