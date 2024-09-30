import { useNavigate, useParams } from "react-router-dom";
import { usePageContext } from "../../data/model/project";
import { IoAddOutline, IoExitOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { TreeData } from "../../data/model/trees";
import { generateId } from "../../data/model/common";
import TreeNodeCard from "./tree-node-card";
import { useRefresher } from "../../data/util";
import { Rnd } from "react-rnd";

export default function TreeView() {
    const { id } = useParams();
    const { setOperationOverride, project, containerSize } = usePageContext();
    const navFn = useNavigate();
    const update = useRefresher();

    if (!id) {
        return <div className="">No ID provided.</div>
    }

    const tree = project.trees.get(id) as TreeData;
    const [offset, setOffset] = useState(tree.viewOffset);

    useEffect(() => {
        setOperationOverride({
            override: [
                {
                    label: "ExitTreeView",
                    icon: <IoExitOutline />,
                    className: "",
                    onClick: () => {
                        navFn(-1);
                    }
                },
                {
                    label: "CreateTreeNode",
                    icon: <IoAddOutline />,
                    className: "",
                    onClick: () => {
                        const { id: nodeId, next } = generateId(
                            project.treesSettings.nodeIdType,
                            project.treesSettings.nodeNextId.get(id) as number,
                        );
                        project.treesSettings.nodeNextId.set(id, next);

                        tree.nodes.push({
                            id: nodeId,
                            position: tree.viewOffset,
                            size: [160, 90],
                            title: "",
                            desc: "",
                        });
                        update();
                    }
                }
            ],
            fullyOverride: true,
        });

        return () => {
            setOperationOverride(null);
        }
    }, [setOperationOverride]);

    return (
        <div
            className="absolute overflow-clip"
            style={{
                width: containerSize[0] + "px",
                height: containerSize[1] + "px",
                backgroundImage: "url(/images/gridbg.svg)",
                backgroundPosition: `${tree.viewOffset[0]}px ${tree.viewOffset[1]}px`
            }}
        >
            <Rnd
                className="absolute"
                style={{ left: "-50%", top: "-50%" }}
                size={{ width: "1000", height: "1000" }}
                enableResizing={false}
                onDrag={(_, data) => {
                    setOffset([offset[0] + data.deltaX, offset[1] + data.deltaY]);
                    tree.viewOffset = offset;
                    update();
                }}
            />
            {
                tree.nodes.map((node, i) =>
                    <TreeNodeCard key={i} node={node} viewOffset={offset}></TreeNodeCard>
                )
            }
        </div>
    );
}
