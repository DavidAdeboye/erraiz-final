import "@testing-library/jest-dom"

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock cookies
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: jest.fn().mockImplementation((name) => {
      if (name === "sessionId") return { value: "test-session-id" }
      if (name === "path") return { value: "/" }
      return null
    }),
    set: jest.fn(),
    delete: jest.fn(),
  }),
}))

// Mock MongoDB
jest.mock("./lib/db", () => ({
  connectToDatabase: jest.fn().mockResolvedValue({
    client: {},
    db: {
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([]),
          sort: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
        }),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
      }),
    },
  }),
  getCollection: jest.fn().mockResolvedValue({
    findOne: jest.fn(),
    find: jest.fn().mockReturnValue({
      toArray: jest.fn().mockResolvedValue([]),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    }),
    insertOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  }),
}))

// Global fetch mock
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  }),
)
