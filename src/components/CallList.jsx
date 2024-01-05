import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllCalls } from "../services";
import {setCalls, archiveAllCalls, setArchivedCalls} from "../redux/actions";
import CallListItem from "./CallListItem.jsx";

const CallList = () => {
    const calls = useSelector((state) => state.allCalls.calls);
    const dispatch = useDispatch();

    const fetchCalls = async () => {
        const response = await getAllCalls();
        const inbox = [];
        const archived = [];
        response.forEach(call => {
            if (call.is_archived) {
                archived.push(call)
            } else {
                inbox.push(call)
            }
        });
        dispatch(setCalls(inbox));
        dispatch(setArchivedCalls(archived));
    }

    useEffect(() => {
        fetchCalls();
    }, []);

    return (
    <div id="call_list">
        <CallListItem type="inbox" />
        {calls.length > 0 ? (
            <div className="archiveAll">
                <span>Inbox ({calls.length})</span>
            </div>
        ) : (
            <div className="archiveAll">
                <span>Inbox is empty</span>
            </div>
        )}
    </div>
  );
};

export default CallList;