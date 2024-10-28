import { auth } from '@/auth';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import z from 'zod';

class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  console.log('LOGGING MIDDLEWARE');

  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  console.log('Result ->', result);
  console.log('Client input ->', clientInput);
  console.log('Metadata ->', metadata);
  console.log('Action execution took', endTime - startTime, 'ms');

  // And then return the result of the awaited action.
  return result;
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new Error('Session not found!');
  }

  if (!session.user.id) {
    throw new Error('Session is not valid!');
  }

  return next({ ctx: { user: session.user } });
});
