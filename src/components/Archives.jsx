import React from "react";
import CallListItem from "./CallListItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {resetCalls} from "../redux/actions";
import {resetAllCalls} from "../services";

const Archives = () => {
    const calls = useSelector((state) => state.allCalls.archivedCalls);
    const dispatch = useDispatch();

    const unArchiveAll = () => {
        const archivedCalls = [...calls];
        archivedCalls.forEach(call => {
            call.is_archived = false;
        });
        resetAllCalls();
        dispatch(resetCalls(archivedCalls));
    }

    return (
        <div id="archives">
            <CallListItem type="archived"/>
            {calls.length > 0 ? (
                <div className="archiveAll" onClick={unArchiveAll}>
                    <span>Unarchive calls ({calls.length})</span>
                </div>
            ) : (
                <div className="archiveAll">
                    <span>Archive is empty</span>
                </div>
            )}
        </div>
    )
}

export default Archives;