import { MdOutlineCenterFocusWeak } from "react-icons/md";
import { usePageContext } from "../../data/model/project";
import { TreeData } from "../../data/model/trees";
import { useRefresher } from "../../data/util";
import { Input } from "../common/input";
import LabelledButton from "../common/labelled-button";
import ListElement from "../common/list-element";
import CardListTemplate from "../common/templates/card-list-template";
import CardTemplate from "../common/templates/card-template";
import { useNavigate } from "react-router-dom";

export default function TreeCard({ id }: { id: string }) {
    const { project } = usePageContext();
    const tree = project.trees.get(id) as TreeData;
    const update = useRefresher();
    const navFn = useNavigate();

    return (
        <CardTemplate>
            <CardListTemplate>
                <ListElement label="Id">
                    <Input value={tree.id} readOnly />
                </ListElement>
                <ListElement label="Name">
                    <Input value={tree.name} onChange={ev => {
                        tree.name = ev.target.value;
                        update();
                    }} />
                </ListElement>
                <LabelledButton label="EnterTreeView" onClick={() => navFn(`/trees/view/${id}`)}>
                    <MdOutlineCenterFocusWeak className="text-2xl" />
                </LabelledButton>
            </CardListTemplate>
        </CardTemplate>
    );
}
