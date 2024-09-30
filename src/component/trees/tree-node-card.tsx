import { TreeNode } from "../../data/model/trees";
import CardListTemplate from "../common/templates/card-list-template";
import ListElement from "../common/list-element";
import { Input } from "../common/input";
import { useRefresher } from "../../data/util";
import { IoMenuOutline } from "react-icons/io5";
import { Rnd } from "react-rnd";
import { useState } from "react";

export default function TreeNodeCard({ node, viewOffset }: { node: TreeNode, viewOffset: [number, number] }) {
    const update = useRefresher();
    const [onDrag, setOnDrag] = useState(false);

    return (
        <Rnd
            className="absolute bg-darker border-2 border-outline rounded-md p-2 w-64"
            position={{ x: node.position[0] + viewOffset[0], y: node.position[1] + viewOffset[1] }}
            onDragStop={(_, data) => {
                node.position = [data.x - viewOffset[0], data.y - viewOffset[1]];
                update();
            }}
            onResizeStop={(_e, _dir, elem, _delta, pos) => {
                node.size[0] = elem.clientWidth;
                node.size[1] = elem.clientHeight;
                node.position = [pos.x - viewOffset[0], pos.y - viewOffset[1]];
                update();
            }}
            minWidth={320}
            size={{ width: node.size[0], height: "" }}
            disableDragging={!onDrag}
            enableResizing={{
                bottom: false,
                bottomLeft: false,
                bottomRight: false,
                left: true,
                right: true,
                top: false,
                topLeft: false,
                topRight: false,
            }}
        >
            <IoMenuOutline className="text-2xl mb-2" onMouseEnter={() => setOnDrag(true)} onMouseLeave={() => setOnDrag(false)} />
            <CardListTemplate>
                <ListElement label="Id">
                    <Input value={node.id} readOnly />
                </ListElement>
                <ListElement label="Title">
                    <Input value={node.title} onChange={ev => {
                        node.title = ev.target.value;
                        update();
                    }} />
                </ListElement>
                <ListElement label="Desc">
                    <Input value={node.desc} onChange={ev => {
                        node.desc = ev.target.value;
                        update();
                    }} />
                </ListElement>
            </CardListTemplate>
        </Rnd>
    );
}
