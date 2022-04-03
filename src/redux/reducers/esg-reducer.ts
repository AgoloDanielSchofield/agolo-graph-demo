const initialState = {};
export type ESGState = Readonly<typeof initialState>;

const esg = (
  action: { type: any; payload: any; message: any } = {
    type: '',
    payload: '',
    message: '',
  },
  state: ESGState = initialState
): ESGState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default esg;
