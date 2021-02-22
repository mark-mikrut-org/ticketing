export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation( // we can test for this  jest.fn() is all we need to fake
          // but this implementation does what we really want to have happen
      (subject: string, data: string, callback: () => void) => {
        // unleashed Zalgo since not async
        callback();
    })
  },
};
