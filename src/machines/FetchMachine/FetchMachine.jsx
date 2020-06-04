import React from 'react';
import { Machine } from 'xstate';
import { useMachine } from "@xstate/react"

const fetchMachine = Machine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        OPEN: "opening"
      }
    },
    open: {
      on: {
        CLOSE: "closing"
      }
    },
    closing: {
      invoke: {
        src: "closeMenu",
        onDone: { target: "closed" }
      },
      on: {
        OPEN: "opening"
      }
    }
  }
})

const FetchMachine = () => {
  const [ current, send ] = useMachine()
}

export default FetchMachine;
