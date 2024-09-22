export default function AssetImgPreview({ src }: { src: string }) {
    return (
        <div className="w-full h-full bg-contain bg-no-repeat" style={{ backgroundImage: `url(${src})` }}></div>
    );
}
