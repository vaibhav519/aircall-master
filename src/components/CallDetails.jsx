import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCall} from "../services";
import {setCall} from "../redux/actions";

const CallDetails = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const call = useSelector((state) => state.allCalls.selectedCall);
    const allCalls = useSelector((state) => state.allCalls.calls);

    const [relatedCalls, setRelatedCalls] = useState([]);

    const fetchCall = async () => {
        const response = await getCall(id);
        dispatch(setCall(response));
        findCalls(response.direction, response.from, response.to);
    }

    const findCalls = (direction, from, to) => {
        const name = direction === 'outbound' ? to : from

        const res = allCalls.filter(call => {
            if ((call.to === name) || (call.from === name)) {
                relatedCalls.push(call);
                setRelatedCalls([...relatedCalls], call);
                return call;
            }
        })
        return res;
    }

    const getCallName = (direction, from, to) => {
        if (direction === 'outbound') {
            return to
        } else {
            return from
        }
    }

    useEffect(() => {
        fetchCall();
    }, []);

    const durationAsSeconds = (duration) => {
        let text = "";
        if (duration > 60) {
            text += Math.ceil(duration/60) + "m ";
        }
        text += duration % 60 + "s";
        return text;
    }

    const getCallDate = (created_at) => {
        const date = new Date(created_at);
        return date.getDate() + '.' + ((date.getMonth()+1 < 0) ? ('0' + (date.getMonth()+1)) : date.getMonth()+1) + '.' + date.getFullYear();
    }

    const getCallTime = (created_at) => {
        const date = new Date(created_at);
        return date.getHours() + ':' + date.getMinutes();
    }

    const renderCalls = relatedCalls.map((call) => {
        if (relatedCalls.length > 0) {
            const {id, direction, is_archived, call_type, created_at, from, to, via, duration} = call;
            return (
                <div key={id} className="call_list_item">
                    <div className="call_direction">
                        <p>from: {from}</p>
                        <p>to: {to}</p>
                        <p>via: {via}</p>
                    </div>
                    <div className="call_duration">
                        <p>{getCallDate(created_at)} {getCallTime(created_at)}</p>
                        <p>{call_type}</p>
                        <p>{durationAsSeconds(duration)}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="info">
                    <p>no call</p>
                </div>
            )
        }
    })

    const {direction, is_archived, call_type, created_at, from, to, via, duration} = call;
    return (
        <div id="callDetails">
            <div className="info">
                <div className="pp">
                    <span className="material-icons-outlined">account_circle</span>
                </div>
                <div className="name">
                    <span>{getCallName(direction, from, to)}</span>
                </div>
            </div>
            <div className="calls">
                {renderCalls}
            </div>
        </div>
    );
};

export default CallDetails;