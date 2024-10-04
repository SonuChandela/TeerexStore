import '../../../style/skeleton.css';

const ProductSkeleton = () => {
    return (
        <>
            <div className="product-skeleton">
                <div className="skeleton-wrapper">
                    <div className="skeleton-header"></div>
                    <div className="skeleton-footer">
                        <div className="left-foot"></div>
                        <div  className="right-foot"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSkeleton;