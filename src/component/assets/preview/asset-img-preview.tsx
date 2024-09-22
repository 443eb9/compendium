export default function AssetImgPreview({ src }: { src: string }) {
    return (
        <div
            className="w-full bg-contain bg-center bg-no-repeat"
            style={{
                height: "calc(100% - 32px)",
                backgroundImage: `url(${src})`
            }}
        ></div>
    );
}
