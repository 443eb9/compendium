import { TagData } from "../../../data/model/common";

export default function Tag({ tag }: { tag: TagData }) {
    return (
        <div className="h-9">
            {tag.name}
        </div>
    );
}
