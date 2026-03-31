import Image from "next/image";

const Slide = () => {
    return (
        <div className="flex h-[80vh] w-full relative">
            <Image
                src="/images/slide/slide5.png"
                alt="Slide Image"
                fill
                className="object-cover object-right"
            />
        </div>
    );
};

export default Slide;
