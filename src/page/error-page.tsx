import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const nav = useNavigate();
    useEffect(() => nav("/"));

    return (
        <div className=""></div>
    );
}
