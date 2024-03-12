import { postHandlers } from './post';
import { chatRoomListHandlers, additionalHandlers } from './chatRoomList';
import { authPageHandlers, additionalauthPageHandlers } from './authHl.js';
import { loginPageHandlers } from './loginHl.js';
export const handlers = [
  ...chatRoomListHandlers,
  ...additionalHandlers,
  ...authPageHandlers,
  ...additionalauthPageHandlers,
  ...loginPageHandlers,
  ...postHandlers,
];
