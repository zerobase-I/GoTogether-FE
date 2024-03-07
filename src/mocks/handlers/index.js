import { http } from 'msw';
import {chatRoomListHandlers,additionalHandlers} from './chatRoomList';
import { authPageHandlers,additionalauthPageHandlers } from './authHl.js';
import { loginPageHandlers, additionalLoginHandlers } from './loginHl.js';
export const handlers = [
    ...chatRoomListHandlers,
    ...additionalHandlers,
    ...authPageHandlers,
    ...additionalauthPageHandlers,
    ...loginPageHandlers,
    ...additionalLoginHandlers
];