import { describe, it, expect, vi, beforeEach } from 'vitest'


vi.mock('../../data/dictionary', () => ({
  isValidWord: (w: string) => ['APPLE', 'GRAPE'].includes(w.toUpperCase()),
}))

import { useGameStore } from './store'

function typeWord(w: string) {
  for (const ch of w) useGameStore.getState().input(ch)
}

beforeEach(() => {
  // сброс «видимого» состояния перед каждым тестом
  useGameStore.setState({
    day: '',
    answer: 'APPLE',
    rows: [],
    current: '',
    status: 'playing',
    keyboard: {},
    invalidTick: 0,
    invalidReason: null,
  })
})

describe('Game store', () => {
  it('increments invalidTick and sets "notfound" for unknown 5-letter word', () => {
    // слово длиной 5, но его нет в словаре-моке
    typeWord('ZZZZZ') // пройдёт проверку длины
    useGameStore.getState().submit()

    const s = useGameStore.getState()
    expect(s.invalidReason).toBe('notfound')
    expect(s.invalidTick).toBe(1)
    expect(s.rows).toHaveLength(0)
    expect(s.status).toBe('playing')
  })

  it('wins on correct guess and updates rows/status/keyboard', () => {
    typeWord('APPLE')
    useGameStore.getState().submit()

    const s = useGameStore.getState()
    expect(s.status).toBe('won')
    expect(s.rows).toEqual(['APPLE'])
    // несколько sanity-проверок по клавиатуре
    expect(s.keyboard['A']).toBeDefined()
    expect(s.keyboard['A']).toBe('correct')
    expect(s.current).toBe('') // после сабмита очищается
  })
})
