// ============================================================
//  AI Engineer 90-Day Training Roadmap — Complete Data File
//  Capstone Project: Enterprise AI Operations Copilot
// ============================================================

window.WEEK_TITLES = [
  "Python Engineering Foundation",
  "Advanced Python + DSA + SQL",
  "Backend & APIs",
  "Data & ML Foundations",
  "Deep Learning & PyTorch",
  "LLM Engineering",
  "Production RAG",
  "Agents & Tool Calling",
  "Multi-Agent & MCP",
  "Production Engineering",
  "MLOps / LLMOps",
  "Security & System Design",
  "Capstone + Interview Prep"
];

window.ROADMAP = [
  // ============================================================
  // WEEK 1 — Python Engineering Foundation (Days 1–7)
  // ============================================================
  {
    week: 1,
    title: "Python Engineering Foundation",
    phase: "Foundation",
    days: [
      {
        day: 1,
        week: 1,
        title: "Python Core Mastery — OOP & Clean Architecture",
        topics: ["Classes & OOP", "SOLID Principles", "Type Hints", "Decorators", "Context Managers"],
        buildTask: "Build an OOP-based Task Manager CLI with full CRUD, type hints, and decorators — this becomes the skeleton scaffold for the Capstone's internal job-queue system",
        practiceTask: "Solve 5 LeetCode Easy problems (Two Sum, Valid Parentheses, Reverse String, Palindrome Number, FizzBuzz variant) using only Python built-ins",
        studyQuestions: [
          "What is the difference between a class method and a static method?",
          "How does Python's MRO (Method Resolution Order) work?",
          "When would you use a dataclass vs a regular class?",
          "What is the purpose of __slots__ and when should you use it?",
          "Explain the Liskov Substitution Principle with a real example",
          "How do decorators work internally in Python?",
          "What is the difference between __str__ and __repr__?",
          "How does Python garbage collection work?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 2,
        week: 1,
        title: "Functional Python & Advanced Patterns",
        topics: ["Generators & Iterators", "Comprehensions", "Closures", "functools", "Abstract Base Classes"],
        buildTask: "Extend the Task Manager CLI with a generator-based pagination system and functools.lru_cache for repeated query optimization",
        practiceTask: "Implement a custom iterator class and a generator pipeline that processes a list of log entries and filters by severity level",
        studyQuestions: [
          "What is the difference between a generator and a list comprehension?",
          "How does the yield keyword change a function's behavior?",
          "What is a closure and when is it useful?",
          "Explain how functools.partial works and provide a use case",
          "What is the purpose of Abstract Base Classes in Python?",
          "How does Python's iterator protocol work internally?",
          "What is the difference between map(), filter(), and reduce()?",
          "How do you implement lazy evaluation in Python?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 3,
        week: 1,
        title: "Clean Code, Debugging & Profiling",
        topics: ["PEP 8 & Code Style", "pdb / breakpoint()", "cProfile & line_profiler", "Memory Profiling", "Logging Best Practices"],
        buildTask: "Add structured JSON logging and a profiling decorator to the Task Manager CLI; identify and fix at least one performance bottleneck",
        practiceTask: "Profile a provided inefficient sorting script, identify bottlenecks using cProfile, and optimize it by at least 50%",
        studyQuestions: [
          "What are the most important PEP 8 rules for professional Python code?",
          "How do you use Python's built-in debugger (pdb) effectively?",
          "What is the difference between cProfile and line_profiler?",
          "How does Python's logging module differ from using print statements?",
          "What is memory profiling and when should you do it?",
          "How do you identify and fix a memory leak in Python?",
          "What is the Global Interpreter Lock (GIL) and how does it affect performance?",
          "What are the best practices for error handling and exception design?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 0, production: 10 }
      },
      {
        day: 4,
        week: 1,
        title: "Testing Fundamentals — pytest & TDD",
        topics: ["pytest Basics", "Fixtures & Parametrize", "Mocking with unittest.mock", "Test-Driven Development", "Code Coverage"],
        buildTask: "Write a full pytest test suite (unit + integration) for the Task Manager CLI, achieving >90% code coverage with fixtures and mocks",
        practiceTask: "Practice TDD by writing tests first for a BankAccount class, then implement the class to pass all tests",
        studyQuestions: [
          "What is Test-Driven Development and what are its benefits?",
          "How do pytest fixtures work and what are their scope levels?",
          "What is the difference between a mock, a stub, and a spy?",
          "How do you use unittest.mock.patch correctly?",
          "What is code coverage and what percentage should you aim for?",
          "How do you test code that interacts with external APIs?",
          "What is parametrize in pytest and when should you use it?",
          "How do you structure a test file and name test functions properly?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 0, production: 10 }
      },
      {
        day: 5,
        week: 1,
        title: "Git & Version Control Mastery",
        topics: ["Git Branching Strategy", "Rebasing vs Merging", "Conventional Commits", "Pre-commit Hooks", "GitHub Flow"],
        buildTask: "Initialize a Git repo for the Capstone project (enterprise-ai-ops-copilot), set up pre-commit hooks (black, isort, flake8, mypy), and write a proper README with architecture diagram",
        practiceTask: "Practice a full Git rebase workflow: create a feature branch, make commits, rebase on main, resolve a simulated conflict, and squash commits",
        studyQuestions: [
          "What is the difference between git merge and git rebase?",
          "How does git cherry-pick work and when would you use it?",
          "What are Conventional Commits and why do they matter?",
          "How do pre-commit hooks improve code quality?",
          "What is the difference between git reset, git revert, and git restore?",
          "How does GitHub Flow differ from GitFlow?",
          "What is a detached HEAD state in Git?",
          "How do you write a useful git commit message?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 0, production: 15 }
      },
      {
        day: 6,
        week: 1,
        title: "Python Concurrency — Threading, Multiprocessing & Asyncio",
        topics: ["Threading vs Multiprocessing", "asyncio Event Loop", "async/await Patterns", "aiohttp", "concurrent.futures"],
        buildTask: "Add an async task-execution engine to the Task Manager CLI using asyncio, with concurrent.futures for CPU-bound work and asyncio for I/O-bound operations",
        practiceTask: "Benchmark the same I/O-bound task (fetch 20 URLs) using: sequential requests, threading, and asyncio — compare and document results",
        studyQuestions: [
          "What is the difference between threading and multiprocessing in Python?",
          "How does the asyncio event loop work?",
          "When should you use async/await vs threading?",
          "What is an asyncio Task vs a coroutine?",
          "How do you handle exceptions in asyncio?",
          "What is the purpose of asyncio.gather() vs asyncio.wait()?",
          "How does concurrent.futures.ThreadPoolExecutor differ from ProcessPoolExecutor?",
          "What are common pitfalls when writing async Python code?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 0, production: 10 }
      },
      {
        day: 7,
        week: 1,
        title: "Week 1 Review — Python Engineering Foundation",
        isReviewDay: true,
        topics: ["OOP Patterns", "Functional Python", "Testing", "Concurrency", "Git Workflow"],
        buildTask: "Finalize the Task Manager CLI: integrate all Week 1 features (async engine, logging, tests, type hints, pre-commit hooks), push to GitHub with a CI-ready structure",
        practiceTask: "Complete a timed coding challenge: implement a thread-safe event bus system from scratch in 90 minutes",
        weekSummary: "Week 1 established the Python engineering foundation required for production AI systems. You built a fully-tested, async-capable, type-safe CLI scaffold that forms the backbone of the Capstone project. Key skills: OOP design, decorators, generators, asyncio, pytest, and professional Git workflow.",
        reviewQuestions: [
          "Explain the difference between concurrency and parallelism in Python",
          "When would you choose a generator over a list? Give three scenarios",
          "What SOLID principles did you apply in the Task Manager and why?",
          "Describe the full lifecycle of a Python decorator at call time",
          "How would you structure a Python project for a production AI service?",
          "What is the difference between __init__ and __new__ in Python?",
          "How do you prevent race conditions in a multi-threaded Python application?",
          "What testing strategy would you apply to an async function?",
          "Explain Python's context manager protocol (__enter__/__exit__)",
          "How does Git rebasing help maintain a clean project history?"
        ],
        xpRewards: { engineering: 30, ml: 0, llm: 0, agents: 0, production: 15 }
      }
    ]
  },

  // ============================================================
  // WEEK 2 — Advanced Python + DSA + SQL (Days 8–14)
  // ============================================================
  {
    week: 2,
    title: "Advanced Python + DSA + SQL",
    phase: "Foundation",
    days: [
      {
        day: 8,
        week: 2,
        title: "Data Structures Deep Dive — Arrays, Trees & Graphs",
        topics: ["Hash Maps & Sets", "Binary Trees", "Graph Representation", "BFS & DFS", "Heap / Priority Queue"],
        buildTask: "Implement a priority-based task scheduler for the Capstone using a min-heap, with BFS traversal for dependency resolution between tasks",
        practiceTask: "Solve 5 LeetCode Medium problems covering hash maps (Two Sum II), trees (Level Order Traversal), and graphs (Number of Islands)",
        studyQuestions: [
          "What is the time complexity of insertion, deletion, and search in a hash map?",
          "How does a binary heap differ from a binary search tree?",
          "What is the difference between BFS and DFS, and when do you use each?",
          "How do you detect a cycle in a directed graph?",
          "What is the space complexity of DFS on a tree vs a graph?",
          "How does Python's heapq module implement a min-heap?",
          "What is a trie and what problems is it optimal for?",
          "Explain the difference between adjacency matrix and adjacency list representations"
        ],
        xpRewards: { engineering: 25, ml: 5, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 9,
        week: 2,
        title: "Algorithm Design — Sorting, Searching & Dynamic Programming",
        topics: ["Merge Sort & Quick Sort", "Binary Search Patterns", "Two Pointers", "Sliding Window", "DP Fundamentals"],
        buildTask: "Add an intelligent search and filter engine to the Capstone's task scheduler using binary search and sliding window for time-range queries",
        practiceTask: "Implement merge sort, quicksort, and binary search from scratch, then solve 3 DP problems: Fibonacci, Coin Change, and Longest Common Subsequence",
        studyQuestions: [
          "What is the average and worst-case time complexity of quicksort?",
          "How does merge sort achieve O(n log n) in the worst case?",
          "What is the two-pointer technique and when does it apply?",
          "How do you identify a sliding window problem?",
          "What is the difference between memoization and tabulation in DP?",
          "How do you find the optimal substructure of a DP problem?",
          "When does binary search work and what are its variants?",
          "What is the difference between greedy algorithms and dynamic programming?"
        ],
        xpRewards: { engineering: 25, ml: 5, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 10,
        week: 2,
        title: "Big-O Analysis & Complexity Optimization",
        topics: ["Time Complexity Analysis", "Space Complexity", "Amortized Analysis", "Profiling in Practice", "Algorithm Trade-offs"],
        buildTask: "Audit the Capstone task scheduler for complexity bottlenecks; replace any O(n²) operations with optimal alternatives and document the Big-O for every function",
        practiceTask: "Analyze 10 code snippets and determine their time and space complexity; refactor 3 of them to improve asymptotic performance",
        studyQuestions: [
          "What is the difference between O(n), O(n log n), and O(n²)?",
          "How do you calculate the time complexity of a recursive function?",
          "What is amortized analysis and when does it apply?",
          "Why is O(n log n) the theoretical lower bound for comparison-based sorting?",
          "What is the space complexity trade-off of using memoization?",
          "How do you optimize a solution that is correct but too slow?",
          "What is the master theorem and how do you apply it?",
          "How does cache efficiency affect real-world algorithm performance?"
        ],
        xpRewards: { engineering: 25, ml: 5, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 11,
        week: 2,
        title: "SQL Fundamentals — Queries, Joins & Aggregations",
        topics: ["SELECT Queries", "JOINs (INNER, LEFT, RIGHT, FULL)", "GROUP BY & HAVING", "Subqueries", "Window Functions"],
        buildTask: "Design and populate a PostgreSQL database schema for the Capstone (operations_logs, incidents, alerts, agents tables) with complex query examples",
        practiceTask: "Write 10 SQL queries of increasing complexity: basic SELECT → multi-table JOINs → window functions (ROW_NUMBER, RANK, LAG/LEAD)",
        studyQuestions: [
          "What is the difference between INNER JOIN and LEFT JOIN?",
          "How do window functions differ from GROUP BY aggregations?",
          "What is the execution order of a SQL query (FROM → WHERE → GROUP BY → ...)?",
          "When would you use a subquery vs a CTE?",
          "How does HAVING differ from WHERE?",
          "What is the difference between RANK() and DENSE_RANK()?",
          "How do you optimize a slow SQL query?",
          "What is a correlated subquery and what are its performance implications?"
        ],
        xpRewards: { engineering: 20, ml: 5, llm: 0, agents: 0, production: 10 }
      },
      {
        day: 12,
        week: 2,
        title: "Advanced SQL — Indexes, Query Plans & Database Design",
        topics: ["B-Tree Indexes", "EXPLAIN ANALYZE", "Normalization (1NF-3NF)", "Transactions & ACID", "Connection Pooling"],
        buildTask: "Optimize the Capstone database schema: add indexes, analyze query plans with EXPLAIN ANALYZE, implement transactions for atomic incident creation",
        practiceTask: "Take a slow multi-table query, run EXPLAIN ANALYZE, add appropriate indexes, and measure the improvement in query time",
        studyQuestions: [
          "How does a B-tree index work internally?",
          "What is the difference between a clustered and a non-clustered index?",
          "How do you read and interpret EXPLAIN ANALYZE output?",
          "What are the ACID properties of a database transaction?",
          "What is database normalization and when do you denormalize?",
          "What is an N+1 query problem and how do you fix it?",
          "How does connection pooling improve database performance?",
          "What is the difference between optimistic and pessimistic locking?"
        ],
        xpRewards: { engineering: 20, ml: 5, llm: 0, agents: 0, production: 15 }
      },
      {
        day: 13,
        week: 2,
        title: "Python + Database Integration — SQLAlchemy & Alembic",
        topics: ["SQLAlchemy ORM", "Alembic Migrations", "Async SQLAlchemy", "Repository Pattern", "Connection Management"],
        buildTask: "Integrate SQLAlchemy ORM with Alembic migrations into the Capstone project; implement a Repository pattern for the incidents table with full async CRUD",
        practiceTask: "Build a complete data access layer using SQLAlchemy for a User + Post blog schema, including relationships and eager/lazy loading",
        studyQuestions: [
          "What is the difference between SQLAlchemy Core and ORM?",
          "How does Alembic manage database migrations?",
          "What is the Repository pattern and why is it useful?",
          "How do you handle database relationships in SQLAlchemy (one-to-many, many-to-many)?",
          "What is the difference between lazy and eager loading?",
          "How does async SQLAlchemy differ from synchronous SQLAlchemy?",
          "What is the Unit of Work pattern and how does SQLAlchemy implement it?",
          "How do you handle database connection errors gracefully?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 0, production: 15 }
      },
      {
        day: 14,
        week: 2,
        title: "Week 2 Review — Advanced Python, DSA & SQL",
        isReviewDay: true,
        topics: ["DSA Patterns", "Complexity Analysis", "SQL Mastery", "Database Design", "ORM Integration"],
        buildTask: "Complete the Capstone database layer: finalize schema, run all migrations, write 20 repository tests, and benchmark all critical queries",
        practiceTask: "Timed drill: solve 5 LeetCode Medium problems in 2 hours, prioritizing hash maps, trees, and DP patterns",
        weekSummary: "Week 2 built strong algorithmic and data foundation skills. The Capstone now has a production-grade database layer with SQLAlchemy, Alembic migrations, optimized indexes, and a clean repository pattern. These DSA and SQL skills are directly tested in AI engineering technical interviews.",
        reviewQuestions: [
          "Walk through the time and space complexity of merge sort",
          "How would you choose between a graph BFS and DFS for a given problem?",
          "Design a database schema for an AI incident tracking system with multiple agent types",
          "What is the difference between a clustered index and a covering index?",
          "Explain the N+1 problem and how SQLAlchemy's eager loading solves it",
          "How do window functions enable analytics that GROUP BY cannot?",
          "What DP approach would you use to find the longest increasing subsequence?",
          "How do you ensure ACID compliance in a multi-step incident creation workflow?",
          "What are the trade-offs between normalization and query performance?",
          "How does the Repository pattern make your codebase more testable?"
        ],
        xpRewards: { engineering: 30, ml: 5, llm: 0, agents: 0, production: 15 }
      }
    ]
  },

  // ============================================================
  // WEEK 3 — Backend & APIs (Days 15–21)
  // ============================================================
  {
    week: 3,
    title: "Backend & APIs",
    phase: "Foundation",
    days: [
      {
        day: 15,
        week: 3,
        title: "FastAPI Fundamentals — Routes, Models & Validation",
        topics: ["FastAPI Project Structure", "Path & Query Parameters", "Pydantic v2 Models", "Request/Response Schemas", "Automatic OpenAPI Docs"],
        buildTask: "Bootstrap the Capstone FastAPI application (enterprise-ai-ops-copilot API): define routes for /incidents, /alerts, /agents with full Pydantic v2 schemas",
        practiceTask: "Build a FastAPI CRUD API for a Library Management system with books and authors, including full Pydantic validation and auto-generated docs",
        studyQuestions: [
          "How does FastAPI use Python type hints to generate OpenAPI documentation?",
          "What is the difference between Pydantic BaseModel and dataclasses?",
          "How do you handle optional vs required fields in Pydantic v2?",
          "What is the difference between path parameters, query parameters, and request body?",
          "How does FastAPI's dependency injection system work?",
          "What is the difference between response_model and return type annotation?",
          "How do you implement field validators in Pydantic v2?",
          "What is the purpose of model_config in Pydantic v2?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 0, production: 15 }
      },
      {
        day: 16,
        week: 3,
        title: "REST API Design — Best Practices & Standards",
        topics: ["RESTful Resource Design", "HTTP Status Codes", "Versioning Strategies", "HATEOAS", "API Pagination"],
        buildTask: "Refactor the Capstone API to follow REST best practices: proper resource naming, correct HTTP methods, versioned endpoints (/api/v1/...), cursor-based pagination",
        practiceTask: "Design a complete RESTful API specification (in OpenAPI YAML) for an AI agent management system with full CRUD, pagination, and filtering",
        studyQuestions: [
          "What are the six constraints of REST architecture?",
          "How do you design RESTful endpoints for nested resources?",
          "What is the difference between PUT and PATCH?",
          "When should you use 201 vs 200 vs 202 HTTP status codes?",
          "What are the pros and cons of different API versioning strategies?",
          "What is cursor-based pagination and why is it better than offset for large datasets?",
          "How do you implement HATEOAS in a REST API?",
          "What is idempotency and which HTTP methods must be idempotent?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 0, production: 20 }
      },
      {
        day: 17,
        week: 3,
        title: "Authentication & Authorization — JWT & OAuth2",
        topics: ["JWT Tokens", "OAuth2 with FastAPI", "Role-Based Access Control", "API Keys", "Refresh Token Pattern"],
        buildTask: "Add JWT-based authentication to the Capstone API with role-based access control (Admin, Operator, Viewer roles) and refresh token support",
        practiceTask: "Implement a complete OAuth2 password flow with JWT access tokens and refresh tokens in a standalone FastAPI app, including token revocation",
        studyQuestions: [
          "How does JWT work and what are its three parts?",
          "What is the difference between authentication and authorization?",
          "How does OAuth2's Authorization Code flow work?",
          "What are the security risks of storing JWT tokens in localStorage vs httpOnly cookies?",
          "How do you implement role-based access control in FastAPI?",
          "What is the purpose of a refresh token?",
          "How do you handle token revocation in a stateless JWT system?",
          "What is the difference between symmetric and asymmetric JWT signing?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 5, production: 20 }
      },
      {
        day: 18,
        week: 3,
        title: "Advanced FastAPI — Middleware, Background Tasks & WebSockets",
        topics: ["FastAPI Middleware", "Background Tasks", "WebSocket Endpoints", "Server-Sent Events", "Request Lifecycle"],
        buildTask: "Add real-time capabilities to the Capstone API: WebSocket endpoint for live incident feeds, background task for async alert processing, and request-timing middleware",
        practiceTask: "Build a real-time notification system using FastAPI WebSockets that broadcasts messages to all connected clients when new alerts are created",
        studyQuestions: [
          "How does FastAPI middleware work and in what order does it execute?",
          "What is the difference between BackgroundTasks and asyncio.create_task()?",
          "How do WebSockets differ from HTTP and when should you use them?",
          "What are Server-Sent Events (SSE) and how do they compare to WebSockets?",
          "How do you handle WebSocket disconnections gracefully?",
          "What is the Starlette request lifecycle in FastAPI?",
          "How do you implement request ID tracking across middleware?",
          "What is CORS and how do you configure it correctly in FastAPI?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 5, production: 20 }
      },
      {
        day: 19,
        week: 3,
        title: "Webhooks, Event-Driven Design & Message Queues",
        topics: ["Webhook Design Patterns", "Celery Task Queue", "Redis as Message Broker", "Event Sourcing Basics", "Retry & Dead Letter Queues"],
        buildTask: "Add a webhook delivery system to the Capstone: outbound webhooks for incident events, Celery workers for async processing, Redis broker, and retry logic with exponential backoff",
        practiceTask: "Build a webhook receiver and sender system: sender signs payloads with HMAC, receiver validates signatures and processes events asynchronously",
        studyQuestions: [
          "How do webhooks differ from polling APIs?",
          "How do you secure webhook endpoints against unauthorized delivery?",
          "What is HMAC signature validation and how do you implement it?",
          "How does Celery's task queue work with Redis as a broker?",
          "What is a dead letter queue and when do you need one?",
          "How do you implement exponential backoff for webhook retries?",
          "What is event sourcing and how does it differ from CRUD?",
          "What are the trade-offs between synchronous API calls and async message queues?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 5, production: 20 }
      },
      {
        day: 20,
        week: 3,
        title: "API Testing, Documentation & Client SDKs",
        topics: ["pytest + httpx for API Tests", "TestClient in FastAPI", "OpenAPI Spec Generation", "Postman Collections", "Auto-generated SDK Concepts"],
        buildTask: "Write a complete async test suite for the Capstone API (>85% coverage) using pytest + httpx, covering all endpoints, auth flows, and error cases",
        practiceTask: "Generate an OpenAPI spec from your FastAPI app, import it into Postman, and write a Postman collection with pre-request scripts and test assertions",
        studyQuestions: [
          "How do you test FastAPI endpoints with authentication using TestClient?",
          "What is the difference between unit tests and integration tests for APIs?",
          "How do you mock external service calls in API tests?",
          "What is contract testing and how does it relate to OpenAPI specs?",
          "How do you test WebSocket endpoints in FastAPI?",
          "What should you include in a production-ready API documentation page?",
          "How do you generate a Python client SDK from an OpenAPI spec?",
          "What is property-based testing and when is it useful for APIs?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 0, agents: 0, production: 20 }
      },
      {
        day: 21,
        week: 3,
        title: "Week 3 Review — Backend & APIs",
        isReviewDay: true,
        topics: ["FastAPI Architecture", "REST Design", "Authentication", "Real-time", "Testing"],
        buildTask: "Deploy the Capstone API locally with uvicorn, complete all endpoint tests, generate final OpenAPI docs, and document the API in the project README",
        practiceTask: "Design and implement a mini API gateway with rate limiting, authentication forwarding, and request logging in under 2 hours",
        weekSummary: "Week 3 produced a production-grade FastAPI backend for the Capstone with JWT auth, RBAC, WebSockets, async background tasks, webhook delivery, and a comprehensive test suite. This API layer is the core interface for all AI agent integrations in later weeks.",
        reviewQuestions: [
          "Explain FastAPI's dependency injection system and how you use it for auth",
          "What are the trade-offs between JWT and session-based authentication?",
          "How would you design a rate limiting middleware for a FastAPI app?",
          "Describe the full request lifecycle from HTTP request to FastAPI response",
          "How do you handle database transactions spanning multiple API endpoints?",
          "When would you choose WebSockets over SSE for real-time updates?",
          "How do you prevent webhook endpoint abuse and validate payload authenticity?",
          "What is the difference between TestClient and httpx.AsyncClient for testing?",
          "How would you version a REST API without breaking existing clients?",
          "What monitoring and observability would you add to a production FastAPI app?"
        ],
        xpRewards: { engineering: 30, ml: 0, llm: 0, agents: 5, production: 25 }
      }
    ]
  },

  // ============================================================
  // WEEK 4 — Data & ML Foundations (Days 22–28)
  // ============================================================
  {
    week: 4,
    title: "Data & ML Foundations",
    phase: "Core ML",
    days: [
      {
        day: 22,
        week: 4,
        title: "NumPy & Linear Algebra Essentials",
        topics: ["NumPy Arrays & Broadcasting", "Matrix Operations", "Dot Products & Norms", "Eigenvalues/SVD Intuition", "Vectorized Operations"],
        buildTask: "Build a NumPy-based log anomaly detector for the Capstone: vectorized computation of z-scores across metric time-series arrays for outlier detection",
        practiceTask: "Implement matrix multiplication from scratch, then compare with NumPy's dot product; implement PCA using eigenvalue decomposition",
        studyQuestions: [
          "What is broadcasting in NumPy and how does it work?",
          "How do you perform matrix multiplication in NumPy and what are the shape rules?",
          "What is the difference between element-wise and matrix multiplication?",
          "How does SVD decompose a matrix and why is it useful in ML?",
          "What is the L1 vs L2 norm and when do you use each?",
          "Why are vectorized operations faster than Python for loops?",
          "What is the role of linear algebra in machine learning algorithms?",
          "How does NumPy's memory layout (C vs Fortran order) affect performance?"
        ],
        xpRewards: { engineering: 15, ml: 25, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 23,
        week: 4,
        title: "Pandas & Data Manipulation",
        topics: ["DataFrame Operations", "GroupBy & Aggregations", "Merging & Reshaping", "Time-Series with Pandas", "Handling Missing Data"],
        buildTask: "Build a Pandas-based analytics pipeline for the Capstone: process raw operations logs into aggregated incident reports (by severity, time bucket, agent type)",
        practiceTask: "Analyze a real-world dataset (e.g., NYC taxi trips): clean nulls, perform groupby aggregations, compute rolling averages, and create a pivot table summary",
        studyQuestions: [
          "What is the difference between .loc[] and .iloc[] in Pandas?",
          "How does Pandas GroupBy work internally?",
          "What is the difference between merge, join, and concat in Pandas?",
          "How do you handle missing data in Pandas (dropna vs fillna vs interpolate)?",
          "What is a Pandas MultiIndex and when is it useful?",
          "How do you perform time-series resampling in Pandas?",
          "What are the performance implications of using apply() vs vectorized operations?",
          "How do you melt and pivot a DataFrame?"
        ],
        xpRewards: { engineering: 15, ml: 25, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 24,
        week: 4,
        title: "Feature Engineering & Data Preprocessing",
        topics: ["Normalization & Standardization", "Encoding Categorical Variables", "Feature Selection", "Handling Imbalanced Data", "Data Pipelines with sklearn"],
        buildTask: "Build an ML feature pipeline for the Capstone's anomaly detection module: extract features from log data (frequency, recency, severity score), normalize, and encode",
        practiceTask: "Given a raw dataset with mixed types, missing values, and class imbalance: build a complete sklearn Pipeline with preprocessing, feature selection, and SMOTE",
        studyQuestions: [
          "What is the difference between normalization and standardization?",
          "How do you encode high-cardinality categorical variables?",
          "What is target encoding and when is it risky?",
          "How do you handle class imbalance in a classification problem?",
          "What is feature selection vs feature extraction?",
          "How does sklearn's Pipeline prevent data leakage?",
          "What is the curse of dimensionality?",
          "How do you engineer time-based features from timestamp data?"
        ],
        xpRewards: { engineering: 15, ml: 30, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 25,
        week: 4,
        title: "Scikit-Learn — Classical ML Algorithms",
        topics: ["Linear & Logistic Regression", "Decision Trees & Random Forest", "SVM", "k-NN", "Gradient Boosting (XGBoost)"],
        buildTask: "Train an incident severity classifier for the Capstone using a Random Forest on engineered log features; evaluate with cross-validation",
        practiceTask: "Train and compare five ML classifiers on the same dataset; report accuracy, F1-score, and training time for each; select the best with justification",
        studyQuestions: [
          "How does logistic regression differ from linear regression in output?",
          "How does a random forest reduce overfitting compared to a single decision tree?",
          "What is the bias-variance trade-off?",
          "How does gradient boosting differ from bagging?",
          "What is the kernel trick in SVM?",
          "When would you use k-NN over a tree-based model?",
          "What hyperparameters are most important to tune in XGBoost?",
          "How does cross-validation prevent overfitting during model selection?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 0, agents: 0, production: 5 }
      },
      {
        day: 26,
        week: 4,
        title: "Model Evaluation & Metrics",
        topics: ["Confusion Matrix", "Precision, Recall, F1", "ROC-AUC", "Regression Metrics", "Cross-Validation Strategies"],
        buildTask: "Add a model evaluation dashboard endpoint to the Capstone API that returns classification metrics (precision, recall, F1, ROC-AUC) for the incident classifier",
        practiceTask: "Given a classifier's predictions and ground truth, compute all evaluation metrics from scratch (without sklearn); plot the ROC curve and precision-recall curve",
        studyQuestions: [
          "What is the difference between precision and recall, and when do you optimize each?",
          "How do you interpret the ROC-AUC score?",
          "What is the precision-recall trade-off?",
          "When would you use F1 vs F-beta score?",
          "What is the difference between macro, micro, and weighted averaging of metrics?",
          "How does stratified k-fold cross-validation differ from regular k-fold?",
          "What is the Matthews Correlation Coefficient and when is it better than F1?",
          "How do you choose the right evaluation metric for a given business problem?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 0, agents: 0, production: 10 }
      },
      {
        day: 27,
        week: 4,
        title: "Unsupervised Learning & Data Visualization",
        topics: ["K-Means Clustering", "DBSCAN", "PCA & t-SNE", "Matplotlib & Seaborn", "Plotly for Interactive Charts"],
        buildTask: "Add unsupervised incident clustering to the Capstone: K-Means to group similar incidents, PCA for dimensionality reduction, and Plotly charts served via a /dashboard endpoint",
        practiceTask: "Apply K-Means and DBSCAN to a synthetic dataset; use PCA and t-SNE for 2D visualization; determine optimal k using the Elbow Method and Silhouette Score",
        studyQuestions: [
          "How does K-Means clustering work and what are its limitations?",
          "How does DBSCAN differ from K-Means in handling noise?",
          "What is PCA and what does each principal component represent?",
          "How does t-SNE differ from PCA for visualization?",
          "How do you determine the optimal number of clusters?",
          "What is the Silhouette Score?",
          "When would you use hierarchical clustering over K-Means?",
          "What is the difference between dimensionality reduction for visualization vs compression?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 0, agents: 0, production: 10 }
      },
      {
        day: 28,
        week: 4,
        title: "Week 4 Review — Data & ML Foundations",
        isReviewDay: true,
        topics: ["NumPy/Pandas Pipelines", "Feature Engineering", "Classical ML", "Model Evaluation", "Clustering"],
        buildTask: "Integrate the incident severity classifier and clustering module into the Capstone API; expose /predict and /cluster endpoints with proper validation",
        practiceTask: "End-to-end mini ML project in 3 hours: raw data → EDA → feature engineering → train 3 models → evaluate → pick winner → serialize with joblib",
        weekSummary: "Week 4 established a solid ML foundation with NumPy vectorization, Pandas data pipelines, sklearn classical models, and proper evaluation methodology. The Capstone now has a functioning incident classifier and clustering module integrated into the API.",
        reviewQuestions: [
          "Walk through the full ML workflow from raw data to deployed model",
          "What is data leakage and how do sklearn Pipelines prevent it?",
          "Explain the bias-variance trade-off and how to diagnose each problem",
          "When would you choose XGBoost over a neural network for tabular data?",
          "How does class imbalance affect model training and evaluation metrics?",
          "Design a feature engineering strategy for an incident log classification problem",
          "What is the difference between K-Means and DBSCAN for anomaly detection?",
          "How do you interpret a confusion matrix for a multi-class problem?",
          "When is ROC-AUC a misleading metric?",
          "How would you explain a random forest prediction to a non-technical stakeholder?"
        ],
        xpRewards: { engineering: 15, ml: 30, llm: 0, agents: 0, production: 15 }
      }
    ]
  },

  // ============================================================
  // WEEK 5 — Deep Learning & PyTorch (Days 29–35)
  // ============================================================
  {
    week: 5,
    title: "Deep Learning & PyTorch",
    phase: "Core ML",
    days: [
      {
        day: 29,
        week: 5,
        title: "PyTorch Tensors & Autograd",
        topics: ["Tensor Operations", "Autograd & Computational Graph", "GPU Acceleration", "Tensor Broadcasting", "Gradient Computation"],
        buildTask: "Implement a tensor-based log embedding prototype for the Capstone: represent incident logs as numerical tensors, compute cosine similarity between incidents",
        practiceTask: "Implement forward pass and manual backpropagation for a simple 2-layer network from scratch; verify with PyTorch autograd",
        studyQuestions: [
          "What is a computational graph in PyTorch and how does autograd use it?",
          "What is the difference between .detach() and .no_grad()?",
          "How does PyTorch's dynamic computation graph differ from TensorFlow 1.x's static graph?",
          "How do you move tensors between CPU and GPU?",
          "What is gradient accumulation and when do you need it?",
          "How do you implement custom autograd functions in PyTorch?",
          "What is the difference between torch.Tensor and torch.nn.Parameter?",
          "How does tensor broadcasting work and what are its rules?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 5, agents: 0, production: 5 }
      },
      {
        day: 30,
        week: 5,
        title: "Neural Network Architecture — nn.Module & Layers",
        topics: ["nn.Module", "Linear Layers", "Activation Functions", "Batch Normalization", "Dropout Regularization"],
        buildTask: "Build a multi-layer feedforward classifier in PyTorch for incident severity prediction; replace the sklearn model in the Capstone with this neural network",
        practiceTask: "Implement and compare networks with and without BatchNorm and Dropout on a tabular dataset; plot training curves to visualize the effect on overfitting",
        studyQuestions: [
          "How does nn.Module work and what is the purpose of forward()?",
          "What is the vanishing gradient problem and how do modern activations (ReLU, GELU) address it?",
          "How does Batch Normalization work mathematically?",
          "What is the difference between Dropout and DropPath?",
          "How do you initialize neural network weights effectively?",
          "What is the difference between nn.Sequential and custom nn.Module?",
          "How do you count the number of trainable parameters in a model?",
          "When would you use Layer Normalization instead of Batch Normalization?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 10, agents: 0, production: 5 }
      },
      {
        day: 31,
        week: 5,
        title: "Training Loops, Optimizers & Loss Functions",
        topics: ["Training Loop Pattern", "Adam, AdamW, SGD", "Learning Rate Scheduling", "Gradient Clipping", "Early Stopping"],
        buildTask: "Build a robust training harness for the Capstone neural network: AdamW optimizer, cosine LR scheduler, gradient clipping, early stopping, and checkpoint saving",
        practiceTask: "Train the same model with SGD vs Adam vs AdamW; compare convergence speed, final accuracy, and stability; document findings",
        studyQuestions: [
          "How does the Adam optimizer work mathematically?",
          "What is the difference between Adam and AdamW?",
          "What is a learning rate schedule and why is cosine annealing effective?",
          "What is gradient clipping and when do you need it?",
          "How do you implement early stopping correctly (on validation loss)?",
          "What is the difference between BCELoss and BCEWithLogitsLoss?",
          "How do you handle class imbalance in the loss function?",
          "What is gradient accumulation and why is it used for large batch training?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 10, agents: 0, production: 5 }
      },
      {
        day: 32,
        week: 5,
        title: "CNNs & Computer Vision Fundamentals",
        topics: ["Convolutional Layers", "Pooling & Stride", "Transfer Learning", "torchvision", "Feature Map Visualization"],
        buildTask: "Add an optional screenshot analysis module to the Capstone: use a pre-trained ResNet18 via transfer learning to classify alert screenshots (normal/anomaly)",
        practiceTask: "Fine-tune a pre-trained ResNet18 on a custom binary image classification dataset using torchvision transforms and a frozen backbone",
        studyQuestions: [
          "How does a convolutional layer differ from a fully-connected layer?",
          "What is the receptive field of a CNN layer?",
          "How does max pooling vs average pooling affect feature maps?",
          "What is transfer learning and why does it work?",
          "How do you decide which layers to freeze during fine-tuning?",
          "What is data augmentation and why is it important for CNNs?",
          "What is the difference between stride and padding in a convolutional layer?",
          "How do you visualize what a CNN has learned (grad-cam, feature maps)?"
        ],
        xpRewards: { engineering: 10, ml: 30, llm: 5, agents: 0, production: 5 }
      },
      {
        day: 33,
        week: 5,
        title: "Sequence Models — RNNs, LSTMs & Attention Basics",
        topics: ["RNN Architecture", "LSTM & GRU", "Vanishing Gradient in RNNs", "Self-Attention Intuition", "Sequence-to-Sequence"],
        buildTask: "Build an LSTM-based log sequence anomaly detector for the Capstone: encode log sequences and predict next-log probability to flag anomalies",
        practiceTask: "Implement an LSTM from scratch for time-series next-step prediction on a sine wave; compare with a GRU on the same task",
        studyQuestions: [
          "How does an LSTM solve the vanishing gradient problem compared to a vanilla RNN?",
          "What are the four gates of an LSTM and what does each control?",
          "How does a GRU simplify the LSTM architecture?",
          "What is the attention mechanism and why was it introduced?",
          "How does self-attention differ from cross-attention?",
          "What is teacher forcing and what are its trade-offs?",
          "How do you handle variable-length sequences in PyTorch (padding, packing)?",
          "What is the difference between sequence classification and sequence labeling?"
        ],
        xpRewards: { engineering: 10, ml: 25, llm: 15, agents: 0, production: 5 }
      },
      {
        day: 34,
        week: 5,
        title: "Model Persistence, Deployment & ONNX",
        topics: ["torch.save & state_dict", "ONNX Export", "TorchScript", "Model Serving Patterns", "Batch Inference"],
        buildTask: "Export the Capstone incident classifier to ONNX, build an inference endpoint in FastAPI that loads the ONNX model for low-latency batch predictions",
        practiceTask: "Export a PyTorch model to ONNX, load it with onnxruntime, and benchmark latency vs PyTorch inference for batch sizes 1, 8, 32",
        studyQuestions: [
          "What is the difference between saving a full model and saving a state_dict?",
          "What is ONNX and why is it useful for model deployment?",
          "How does TorchScript work and when would you use it over ONNX?",
          "What is dynamic batching in model serving?",
          "How do you optimize a PyTorch model for inference (torch.no_grad, half-precision)?",
          "What is the difference between model quantization and pruning?",
          "How do you serve a PyTorch model with FastAPI in production?",
          "What is a model registry and why is it important for MLOps?"
        ],
        xpRewards: { engineering: 15, ml: 25, llm: 5, agents: 0, production: 15 }
      },
      {
        day: 35,
        week: 5,
        title: "Week 5 Review — Deep Learning & PyTorch",
        isReviewDay: true,
        topics: ["Tensors & Autograd", "Neural Network Design", "Training Loops", "CNNs & LSTMs", "Deployment"],
        buildTask: "Finalize and integrate all DL modules into the Capstone: ONNX-based inference endpoint, LSTM anomaly detector, and model performance dashboard",
        practiceTask: "Build a complete PyTorch project from scratch in 3 hours: data loading → model design → training → evaluation → ONNX export → FastAPI endpoint",
        weekSummary: "Week 5 built deep learning expertise from PyTorch fundamentals through production deployment. The Capstone now has neural network-based severity classification (via ONNX), LSTM-based log anomaly detection, and CNN-based screenshot analysis — all served through the FastAPI backend.",
        reviewQuestions: [
          "Explain the full forward and backward pass through a neural network",
          "How does Adam optimizer update weights differently from plain SGD?",
          "What is the purpose of Batch Normalization in deep networks?",
          "How would you debug a neural network that is not learning (loss not decreasing)?",
          "When would you use an LSTM over a Transformer for sequence modeling?",
          "How does transfer learning reduce the data requirement for new tasks?",
          "What is the difference between model quantization int8 and float16?",
          "How do you prevent overfitting in deep learning (regularization strategies)?",
          "Explain the vanishing gradient problem and three solutions",
          "How would you design a PyTorch training loop for production with checkpointing?"
        ],
        xpRewards: { engineering: 15, ml: 30, llm: 10, agents: 0, production: 15 }
      }
    ]
  },

  // ============================================================
  // WEEK 6 — LLM Engineering (Days 36–42)
  // ============================================================
  {
    week: 6,
    title: "LLM Engineering",
    phase: "LLM Core",
    days: [
      {
        day: 36,
        week: 6,
        title: "Tokenization & Transformer Architecture",
        topics: ["BPE Tokenization", "Vocabulary & Token IDs", "Positional Encoding", "Multi-Head Attention", "Transformer Block"],
        buildTask: "Add a tokenization analysis module to the Capstone: analyze incident descriptions using tiktoken, compute token counts, and build a token budget manager",
        practiceTask: "Implement a minimal Transformer block (multi-head attention + FFN + LayerNorm + residual) in PyTorch from scratch and verify against a reference",
        studyQuestions: [
          "How does Byte-Pair Encoding (BPE) tokenization work?",
          "Why do LLMs struggle with tokenization of numbers and rare words?",
          "How does positional encoding allow Transformers to understand sequence order?",
          "How does scaled dot-product attention work mathematically?",
          "What is the purpose of multiple attention heads?",
          "What is the role of the FFN layer in a Transformer block?",
          "What is RoPE (Rotary Position Embedding) and why is it better than learned PE?",
          "How does the KV cache work during LLM inference?"
        ],
        xpRewards: { engineering: 10, ml: 10, llm: 30, agents: 0, production: 5 }
      },
      {
        day: 37,
        week: 6,
        title: "Prompting Fundamentals — Zero-Shot, Few-Shot & Chain-of-Thought",
        topics: ["Zero-Shot Prompting", "Few-Shot Examples", "Chain-of-Thought", "Prompt Formatting", "System vs User vs Assistant Roles"],
        buildTask: "Build the first LLM-powered feature in the Capstone: a prompt-based incident summarizer that takes raw log data and produces structured incident reports using few-shot CoT prompting",
        practiceTask: "Design and test 10 prompt variants for incident classification; systematically evaluate each on 20 test cases and document which prompt patterns improve accuracy",
        studyQuestions: [
          "What is the difference between zero-shot and few-shot prompting?",
          "How does Chain-of-Thought prompting improve reasoning performance?",
          "What is the role of the system prompt in chat-based LLMs?",
          "How do you format few-shot examples effectively?",
          "What is instruction fine-tuning and how does it affect prompting strategy?",
          "How do you handle prompt injection in user-facing LLM applications?",
          "What is the difference between a chat model and a base model for prompting?",
          "How does temperature affect LLM output and when do you adjust it?"
        ],
        xpRewards: { engineering: 10, ml: 5, llm: 30, agents: 5, production: 5 }
      },
      {
        day: 38,
        week: 6,
        title: "Advanced Prompting — ReAct, Tree of Thought & Self-Consistency",
        topics: ["ReAct Prompting", "Tree of Thought", "Self-Consistency Decoding", "Prompt Chaining", "Meta-Prompting"],
        buildTask: "Add a ReAct-style reasoning trace to the Capstone incident analyzer: the LLM reasons step-by-step before producing a root cause analysis with confidence score",
        practiceTask: "Implement self-consistency: run the same prompt 5 times with temperature=0.7, aggregate the reasoning paths, and return the majority answer",
        studyQuestions: [
          "How does ReAct (Reason + Act) prompting work?",
          "What is Tree of Thought and how does it differ from Chain-of-Thought?",
          "How does self-consistency improve reliability over greedy decoding?",
          "What is prompt chaining and when should you use it over a single complex prompt?",
          "How does meta-prompting differ from standard prompting?",
          "What is the role of temperature vs top-p in controlling output diversity?",
          "When does more reasoning in a prompt hurt performance?",
          "How do you measure prompt robustness across rephrased inputs?"
        ],
        xpRewards: { engineering: 10, ml: 5, llm: 30, agents: 10, production: 5 }
      },
      {
        day: 39,
        week: 6,
        title: "Structured Outputs & JSON Mode",
        topics: ["JSON Mode", "Pydantic + Instructor", "Output Parsers", "Schema Enforcement", "Retry on Parse Failure"],
        buildTask: "Replace all free-text LLM outputs in the Capstone with Pydantic-validated structured outputs using Instructor; implement retry logic for malformed JSON",
        practiceTask: "Build a structured data extraction pipeline: given 20 unstructured incident description strings, extract IncidentReport(severity, category, affected_systems, recommended_actions) using Instructor",
        studyQuestions: [
          "What is JSON mode in OpenAI-compatible APIs?",
          "How does the Instructor library enforce Pydantic schemas on LLM output?",
          "How do you handle LLM output that fails schema validation?",
          "What is the difference between constrained decoding and output parsing?",
          "How do you design Pydantic models for LLM output that are robust to variation?",
          "What are the trade-offs of strict schema enforcement vs flexible parsing?",
          "How do you extract nested structured data from LLM responses?",
          "When would you use a grammar-based constrained decoder instead of output parsing?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 30, agents: 10, production: 10 }
      },
      {
        day: 40,
        week: 6,
        title: "Function Calling & Tool Use",
        topics: ["OpenAI Function Calling API", "Tool Definitions", "Parallel Tool Calls", "Tool Result Injection", "LiteLLM for Multi-Provider"],
        buildTask: "Add function calling to the Capstone: define tools for get_incident_details(), update_incident_status(), trigger_alert(), and search_runbooks() — wire them to the real API",
        practiceTask: "Build a multi-tool LLM assistant that can call 4 functions (weather, calculator, database lookup, web search) and handle parallel tool invocations",
        studyQuestions: [
          "How does the OpenAI function calling API work at the protocol level?",
          "What is the difference between function calling and tool use in the API?",
          "How do you define a function schema for the OpenAI API?",
          "What are parallel tool calls and how do you handle multiple tool results?",
          "How do you inject tool results back into the conversation?",
          "What is LiteLLM and how does it abstract multiple LLM providers?",
          "How do you handle errors when a tool call fails?",
          "What security considerations apply to LLM tool use?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 25, agents: 20, production: 10 }
      },
      {
        day: 41,
        week: 6,
        title: "LLM APIs, Token Management & Cost Optimization",
        topics: ["OpenAI API Deep Dive", "Token Counting with tiktoken", "Context Window Management", "Streaming Responses", "Cost Tracking"],
        buildTask: "Add a cost and token tracking middleware to the Capstone API: track tokens in/out per request, compute cost per model, and expose a /cost-report endpoint",
        practiceTask: "Build a context window manager that intelligently truncates conversation history to fit within a token budget while preserving the most relevant context",
        studyQuestions: [
          "How do you count tokens accurately before making an API call?",
          "What are the trade-offs between context window size and cost?",
          "How do you implement streaming responses in FastAPI with OpenAI?",
          "What is the difference between prompt caching and KV caching?",
          "How do you implement a token budget manager for long conversations?",
          "What strategies reduce LLM API costs without sacrificing quality?",
          "How do you handle API rate limits and implement retry with backoff?",
          "What is the difference between input and output token pricing?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 25, agents: 10, production: 20 }
      },
      {
        day: 42,
        week: 6,
        title: "Week 6 Review — LLM Engineering",
        isReviewDay: true,
        topics: ["Transformer Architecture", "Prompting Strategies", "Structured Outputs", "Function Calling", "Cost Management"],
        buildTask: "Integrate all LLM features into the Capstone: incident summarizer, structured output extractor, function-calling agent, and cost tracker — end-to-end test the full pipeline",
        practiceTask: "Build a complete LLM-powered document classifier with structured output and 5 function-calling tools in under 2 hours",
        weekSummary: "Week 6 transformed the Capstone from a data-driven system to an LLM-powered platform. Key integrations: Transformer-aware token management, few-shot prompting for incident analysis, structured Pydantic outputs via Instructor, function calling for real API integration, and full cost tracking.",
        reviewQuestions: [
          "Explain the scaled dot-product attention mechanism step by step",
          "What is the difference between greedy decoding and sampling?",
          "How does Chain-of-Thought prompting work and what is its failure mode?",
          "Design a prompt for extracting structured data from noisy, unformatted text",
          "How does the OpenAI function calling protocol work at the message level?",
          "What strategies prevent token budget overrun in a multi-turn conversation?",
          "How does Instructor enforce Pydantic schemas on LLM outputs?",
          "What is the trade-off between structured output reliability and model creativity?",
          "How would you implement model fallback (GPT-4 → GPT-3.5) on quota errors?",
          "What is KV caching and how does it reduce inference latency?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 30, agents: 15, production: 20 }
      }
    ]
  },

  // ============================================================
  // WEEK 7 — Production RAG (Days 43–49)
  // ============================================================
  {
    week: 7,
    title: "Production RAG",
    phase: "LLM Core",
    days: [
      {
        day: 43,
        week: 7,
        title: "Chunking Strategies & Document Processing",
        topics: ["Fixed-Size vs Semantic Chunking", "Recursive Text Splitting", "Document Metadata", "PDF/HTML Parsing", "Chunk Overlap Design"],
        buildTask: "Build the Capstone's RAG document ingestion pipeline: parse operations runbooks (PDF/Markdown), apply hierarchical chunking with parent-child relationships and metadata",
        practiceTask: "Compare 4 chunking strategies (fixed 512, fixed 1024, sentence-boundary, semantic) on a 50-page technical document; evaluate retrieval quality for 20 queries",
        studyQuestions: [
          "What are the trade-offs between small vs large chunk sizes in RAG?",
          "How does recursive text splitting work?",
          "What is the parent-child chunking strategy and when is it beneficial?",
          "How do you preserve document structure (headers, tables) during chunking?",
          "What metadata should you store alongside each chunk?",
          "How does chunk overlap affect retrieval quality?",
          "How do you handle multi-modal documents (PDFs with tables and images)?",
          "What is semantic chunking and how does it use embeddings?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 20, agents: 5, production: 15 }
      },
      {
        day: 44,
        week: 7,
        title: "Embeddings — Models, Dimensions & Semantic Search",
        topics: ["Embedding Models (text-embedding-3, BGE, E5)", "Cosine Similarity", "Semantic vs Keyword Search", "Embedding Fine-tuning", "Matryoshka Embeddings"],
        buildTask: "Integrate the embedding layer into the Capstone RAG pipeline: embed all runbook chunks using text-embedding-3-small, store with metadata, and implement semantic search",
        practiceTask: "Benchmark 3 embedding models (text-embedding-3-small, BGE-M3, E5-large) on a retrieval task using NDCG and MRR metrics; plot embedding space with t-SNE",
        studyQuestions: [
          "How are text embeddings generated by transformer models?",
          "What is cosine similarity and why is it preferred over Euclidean distance for embeddings?",
          "What is the difference between dense and sparse retrieval?",
          "How does Matryoshka Representation Learning work?",
          "When would you fine-tune an embedding model?",
          "What is the effect of embedding dimension on retrieval quality and storage?",
          "How do you normalize embeddings and why does it matter?",
          "What is NDCG (Normalized Discounted Cumulative Gain) in retrieval evaluation?"
        ],
        xpRewards: { engineering: 15, ml: 10, llm: 25, agents: 5, production: 15 }
      },
      {
        day: 45,
        week: 7,
        title: "Vector Databases — Qdrant, Pinecone & pgvector",
        topics: ["HNSW Index", "Qdrant Collections & Filters", "pgvector in PostgreSQL", "Metadata Filtering", "Hybrid Search (Dense + Sparse)"],
        buildTask: "Set up Qdrant for the Capstone: create runbook collection, index all embedded chunks with payload metadata, implement filtered semantic search for relevant runbooks",
        practiceTask: "Implement hybrid search (combine BM25 sparse + dense semantic) in Qdrant; compare pure semantic, pure keyword, and hybrid on 30 retrieval queries",
        studyQuestions: [
          "How does HNSW (Hierarchical Navigable Small World) indexing work?",
          "What is the trade-off between ef_construction and search speed in HNSW?",
          "How does pgvector compare to dedicated vector databases like Qdrant or Pinecone?",
          "What is metadata filtering in vector search and how does it affect performance?",
          "How does hybrid search combine dense and sparse retrieval?",
          "What is the Reciprocal Rank Fusion (RRF) algorithm?",
          "How do you handle vector database scaling as your collection grows?",
          "What is the difference between exact KNN and approximate nearest neighbor search?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 20, agents: 10, production: 20 }
      },
      {
        day: 46,
        week: 7,
        title: "Advanced Retrieval — HyDE, Multi-Query & Contextual Compression",
        topics: ["HyDE (Hypothetical Document Embeddings)", "Multi-Query Retrieval", "Contextual Compression", "MMR (Maximal Marginal Relevance)", "Step-Back Prompting"],
        buildTask: "Improve Capstone RAG retrieval quality with HyDE for query expansion and MMR for diversity; implement multi-query retrieval with result deduplication",
        practiceTask: "Implement HyDE from scratch: generate a hypothetical answer with an LLM, embed it, retrieve against the corpus; compare retrieval quality vs standard query embedding",
        studyQuestions: [
          "How does HyDE improve retrieval over direct query embedding?",
          "What is multi-query retrieval and how does it handle query ambiguity?",
          "What is Maximal Marginal Relevance (MMR) and how does it balance relevance and diversity?",
          "What is contextual compression in RAG?",
          "How does step-back prompting improve reasoning in RAG?",
          "What is the difference between retrieval augmentation and long-context LLMs?",
          "How do you handle conflicting information across retrieved chunks?",
          "What is RAPTOR and how does hierarchical summarization improve RAG?"
        ],
        xpRewards: { engineering: 10, ml: 5, llm: 25, agents: 15, production: 15 }
      },
      {
        day: 47,
        week: 7,
        title: "Reranking & Generation Quality",
        topics: ["Cross-Encoder Reranking", "Cohere Rerank API", "Context Assembly", "Citation & Source Tracking", "Faithfulness vs Relevance"],
        buildTask: "Add a reranking stage to the Capstone RAG pipeline: retrieve top-20 chunks, rerank to top-5 with a cross-encoder, assemble context with source citations, generate grounded answers",
        practiceTask: "Implement a bi-encoder retrieval + cross-encoder reranking pipeline; compare MRR@10 and NDCG@10 with and without reranking on a Q&A benchmark",
        studyQuestions: [
          "What is the difference between a bi-encoder and a cross-encoder?",
          "Why is reranking more accurate than retrieval but slower?",
          "How do you assemble retrieved chunks into a context window?",
          "How do you track source citations in RAG outputs?",
          "What is faithfulness vs relevance in RAG evaluation?",
          "How do you handle the lost-in-the-middle problem in RAG context assembly?",
          "What is the optimal number of chunks to retrieve and rerank?",
          "How do you avoid hallucination in RAG-generated answers?"
        ],
        xpRewards: { engineering: 10, ml: 5, llm: 25, agents: 15, production: 20 }
      },
      {
        day: 48,
        week: 7,
        title: "RAG Evaluation — RAGAS & Continuous Quality Monitoring",
        topics: ["RAGAS Framework", "Context Precision & Recall", "Answer Faithfulness", "Answer Relevancy", "Evaluation Datasets"],
        buildTask: "Integrate RAGAS evaluation into the Capstone CI pipeline: auto-evaluate retrieval and generation quality on a golden Q&A dataset of 50 runbook queries after each code push",
        practiceTask: "Build a RAGAS evaluation harness: create 50 Q&A pairs from runbook documents, run RAGAS metrics, and generate a quality report dashboard",
        studyQuestions: [
          "What are the four core RAGAS metrics and what does each measure?",
          "How do you create a golden evaluation dataset for RAG?",
          "What is context precision vs context recall in RAGAS?",
          "How does answer faithfulness differ from answer relevancy?",
          "How do you integrate RAG evaluation into a CI/CD pipeline?",
          "What is LLM-as-a-judge and what are its biases?",
          "How do you detect retrieval degradation over time as your corpus grows?",
          "What is the TREC evaluation framework and how does it relate to RAGAS?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 20, agents: 10, production: 25 }
      },
      {
        day: 49,
        week: 7,
        title: "Week 7 Review — Production RAG",
        isReviewDay: true,
        topics: ["Chunking & Ingestion", "Embeddings & Vector DBs", "Advanced Retrieval", "Reranking", "RAGAS Evaluation"],
        buildTask: "Complete the Capstone RAG module: full pipeline from document ingestion to grounded answer generation with citations; run RAGAS baseline evaluation and document scores",
        practiceTask: "Build a complete production-ready RAG pipeline in 3 hours: PDF ingestion → chunking → embedding → Qdrant → HyDE retrieval → reranking → generation → RAGAS eval",
        weekSummary: "Week 7 built a production-grade RAG system for the Capstone's runbook knowledge base. The pipeline includes semantic chunking, multi-model embedding, Qdrant vector DB with hybrid search, HyDE query expansion, cross-encoder reranking, citation-grounded generation, and automated RAGAS quality monitoring.",
        reviewQuestions: [
          "Compare and contrast the chunking strategies and their effect on retrieval",
          "How does HyDE improve retrieval and what are its limitations?",
          "Design a RAG pipeline for a 10,000-document technical knowledge base",
          "What is the role of metadata in vector database retrieval quality?",
          "How does cross-encoder reranking improve over bi-encoder retrieval?",
          "Explain the lost-in-the-middle problem and how context ordering affects generation",
          "How would you detect and fix a regression in RAG retrieval quality?",
          "What is the difference between RAG and fine-tuning for knowledge injection?",
          "How do you prevent hallucination in grounded RAG generation?",
          "Design a RAGAS evaluation suite for an operations runbook QA system"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 25, agents: 15, production: 25 }
      }
    ]
  },

  // ============================================================
  // WEEK 8 — Agents & Tool Calling (Days 50–56)
  // ============================================================
  {
    week: 8,
    title: "Agents & Tool Calling",
    phase: "Agent Systems",
    days: [
      {
        day: 50,
        week: 8,
        title: "Agent Fundamentals — State Machines & Planning",
        topics: ["Agent Architecture", "State Machine Design", "Planning vs Reactive Agents", "Tool Registry Pattern", "Agent Loop"],
        buildTask: "Design the core agent architecture for the Capstone's AI Operations Agent: state machine with states (IDLE, ANALYZING, EXECUTING, REPORTING), tool registry, and agent loop",
        practiceTask: "Build a finite state machine in Python for a customer support agent with states for triage, information gathering, solution generation, and escalation",
        studyQuestions: [
          "What is the difference between a reactive agent and a planning agent?",
          "How does a state machine model agent behavior?",
          "What is the agent loop and what happens at each step?",
          "How do you design a tool registry for an agent system?",
          "What is the difference between a goal-driven and a task-driven agent?",
          "How do you handle agent errors and unexpected tool results?",
          "What is the horizon problem in planning agents?",
          "How do you make an agent's decisions interpretable and auditable?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 10, agents: 30, production: 10 }
      },
      {
        day: 51,
        week: 8,
        title: "Memory Systems — Short-Term, Long-Term & Episodic",
        topics: ["In-Context Memory", "Vector Store Memory", "Episodic Memory", "Semantic Memory", "Memory Retrieval Strategies"],
        buildTask: "Implement the Capstone agent's memory system: in-context window for current incident, vector store memory for similar past incidents, episodic log of agent actions",
        practiceTask: "Build an agent with three memory types: (1) conversation buffer, (2) entity extraction memory, (3) vector-store long-term memory; test across a 20-turn conversation",
        studyQuestions: [
          "What are the four types of memory in AI agent systems?",
          "How does in-context memory differ from external vector store memory?",
          "What is episodic memory and how does it help agents improve over time?",
          "How do you implement memory retrieval that balances recency and relevance?",
          "What is the memory consolidation problem in long-running agents?",
          "How do you prevent memory contamination across different user sessions?",
          "What is semantic memory and how does it differ from episodic memory?",
          "How do you efficiently compress and summarize agent memory?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 10, agents: 30, production: 10 }
      },
      {
        day: 52,
        week: 8,
        title: "LangChain — Chains, Runnables & LCEL",
        topics: ["LangChain LCEL", "Runnable Interface", "Chains & Pipelines", "Output Parsers", "Chat History Management"],
        buildTask: "Refactor the Capstone incident analysis pipeline using LangChain LCEL: compose prompt → LLM → parser → memory into a clean Runnable pipeline with streaming support",
        practiceTask: "Build a multi-step LangChain pipeline: retrieve docs → summarize → classify → extract entities → format report, using LCEL pipe operators",
        studyQuestions: [
          "What is LangChain's LCEL (LangChain Expression Language)?",
          "How does the Runnable interface enable composition?",
          "What is the difference between RunnableSequence and RunnableParallel?",
          "How do you add streaming to a LangChain LCEL chain?",
          "How do you manage chat history in LangChain?",
          "What are the trade-offs of using LangChain vs building raw LLM pipelines?",
          "How do you debug a multi-step LCEL chain?",
          "What is RunnableWithMessageHistory and how does it work?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 15, agents: 25, production: 10 }
      },
      {
        day: 53,
        week: 8,
        title: "LangGraph — Stateful Agent Graphs",
        topics: ["LangGraph StateGraph", "Nodes & Edges", "Conditional Routing", "Checkpointing", "Human-in-the-Loop"],
        buildTask: "Rebuild the Capstone Operations Agent as a LangGraph StateGraph: nodes for analyze_incident, retrieve_runbook, plan_actions, execute_tools, review_with_human, and generate_report",
        practiceTask: "Build a LangGraph agent for a research task: search → evaluate sources → synthesize → fact-check → human review → finalize report, with persistent checkpointing",
        studyQuestions: [
          "What is LangGraph and how does it extend LangChain for stateful agents?",
          "How do you define a StateGraph with typed state?",
          "How does conditional edge routing work in LangGraph?",
          "What is checkpointing in LangGraph and how does it enable persistence?",
          "How do you implement human-in-the-loop interruptions in LangGraph?",
          "What is the difference between a graph and a chain in LangGraph?",
          "How do you handle cycles in a LangGraph state machine?",
          "How does LangGraph's streaming output work?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 54,
        week: 8,
        title: "ReAct Agents — Reasoning & Acting",
        topics: ["ReAct Framework", "Thought-Action-Observation Loop", "Tool Selection Logic", "Error Recovery", "Stopping Conditions"],
        buildTask: "Implement a full ReAct agent for the Capstone: the agent reasons about an incident, selects appropriate tools (runbook search, alert escalation, metric query), observes results, and iterates",
        practiceTask: "Build a ReAct agent with 5 tools (search, calculator, datetime, weather, news) that can answer complex multi-step questions requiring tool chaining",
        studyQuestions: [
          "How does the ReAct framework combine reasoning and acting?",
          "What is the Thought-Action-Observation loop?",
          "How do you implement a stopping condition for a ReAct agent?",
          "How do you handle a tool returning an error in the ReAct loop?",
          "What is the maximum number of iterations a ReAct agent should run?",
          "How do you prevent a ReAct agent from getting stuck in a loop?",
          "How does ReAct compare to Plan-and-Solve prompting?",
          "How do you test a ReAct agent's tool selection logic?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 55,
        week: 8,
        title: "Evaluation & Testing for Agents",
        topics: ["Agent Trace Analysis", "Tool Call Accuracy", "Trajectory Evaluation", "Benchmarking Agent Tasks", "LangSmith Tracing"],
        buildTask: "Build a testing framework for the Capstone agent: define 30 test scenarios (incident types), trace agent trajectories, evaluate tool selection accuracy, and generate a quality report",
        practiceTask: "Write an agent evaluation harness that tests 10 agent scenarios, scores trajectory quality (correct tool calls, reasoning steps), and generates a CSV report",
        studyQuestions: [
          "How do you evaluate an agent's quality beyond final answer accuracy?",
          "What is trajectory evaluation for agents?",
          "How do you measure tool call accuracy in an agent system?",
          "What is LangSmith and how does it help debug agent traces?",
          "How do you build a golden test set for agent evaluation?",
          "What is the difference between unit testing a tool vs end-to-end testing an agent?",
          "How do you detect agent regressions when you change the underlying LLM?",
          "What metrics matter most for a production operations agent?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 25, production: 20 }
      },
      {
        day: 56,
        week: 8,
        title: "Week 8 Review — Agents & Tool Calling",
        isReviewDay: true,
        topics: ["Agent Architecture", "Memory Systems", "LangGraph", "ReAct", "Agent Evaluation"],
        buildTask: "Integrate the complete Capstone Operations Agent into the FastAPI backend: stateful LangGraph agent with memory, ReAct loop, 8 tools, and LangSmith tracing enabled",
        practiceTask: "Build a fully-functional ReAct agent from scratch in 3 hours — no LangChain framework — using raw OpenAI API calls, a tool registry, and a custom loop",
        weekSummary: "Week 8 produced the Capstone's core AI Operations Agent — a stateful LangGraph agent with multi-type memory, ReAct reasoning, 8 real operational tools, LangSmith observability tracing, and a comprehensive 30-scenario test suite.",
        reviewQuestions: [
          "Design an agent architecture for an autonomous incident response system",
          "What are the failure modes of a ReAct agent and how do you mitigate them?",
          "How does LangGraph's checkpointing enable fault-tolerant long-running agents?",
          "What is the difference between short-term and long-term memory in agents?",
          "How would you evaluate an agent that must perform 5 sequential tool calls?",
          "What is the role of the system prompt in defining agent behavior?",
          "How do you prevent an agent from making irreversible tool calls without confirmation?",
          "What is the trade-off between a heavily constrained agent and a more autonomous one?",
          "How does LCEL differ from traditional LangChain chains?",
          "Design a memory retrieval strategy for an agent that handles hundreds of daily incidents"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 30, production: 20 }
      }
    ]
  },

  // ============================================================
  // WEEK 9 — Multi-Agent & MCP (Days 57–63)
  // ============================================================
  {
    week: 9,
    title: "Multi-Agent & MCP",
    phase: "Agent Systems",
    days: [
      {
        day: 57,
        week: 9,
        title: "Multi-Agent System Design — Supervisor Patterns",
        topics: ["Supervisor-Worker Architecture", "Agent Handoff", "Task Decomposition", "Agent Communication Protocols", "Conflict Resolution"],
        buildTask: "Design the Capstone's multi-agent architecture: a Supervisor agent that delegates to specialist agents (IncidentAgent, RunbookAgent, AlertAgent, ReportAgent) and coordinates their outputs",
        practiceTask: "Build a supervisor-worker multi-agent system where a planner agent decomposes a research task and assigns subtasks to 3 specialist worker agents",
        studyQuestions: [
          "What is the supervisor-worker pattern in multi-agent systems?",
          "How do you decompose a complex task for multi-agent execution?",
          "How do agents communicate in a multi-agent system?",
          "What is the difference between sequential and parallel agent execution?",
          "How do you handle conflicts when multiple agents produce contradictory outputs?",
          "What is agent handoff and how do you implement it cleanly?",
          "How do you prevent a multi-agent system from getting into infinite loops?",
          "What observability do you need for a multi-agent production system?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 58,
        week: 9,
        title: "Model Context Protocol (MCP) — Architecture & Concepts",
        topics: ["MCP Protocol Overview", "MCP vs REST APIs", "Client-Server Model", "Transport Layers (stdio, SSE)", "Protocol Versioning"],
        buildTask: "Study and document the MCP specification; design the Capstone MCP server architecture that will expose AI Ops tools to external MCP-compatible clients",
        practiceTask: "Set up a local MCP development environment; run the official MCP inspector tool and explore the protocol messages using stdio transport",
        studyQuestions: [
          "What is the Model Context Protocol (MCP) and what problem does it solve?",
          "How does MCP differ from calling tools directly via function calling?",
          "What are the three transport layers in MCP and when do you use each?",
          "What is the MCP client-server architecture?",
          "How does MCP enable tool discovery and capability negotiation?",
          "What is the role of the MCP inspector during development?",
          "How does MCP handle protocol versioning and backwards compatibility?",
          "What security model does MCP implement?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 59,
        week: 9,
        title: "MCP Server Development — Tools & Resources",
        topics: ["MCP Tools Definition", "MCP Resources", "Tool Input Schemas", "Resource URI Patterns", "mcp Python SDK"],
        buildTask: "Build the Capstone MCP Server: expose get_incident(), list_alerts(), search_runbooks(), trigger_escalation(), and get_metrics() as MCP tools with full JSON Schema definitions",
        practiceTask: "Build a complete MCP server with 5 tools and 3 resources using the mcp Python SDK; test all tools via the MCP inspector",
        studyQuestions: [
          "How do you define an MCP tool with input validation?",
          "What is the difference between an MCP Tool and an MCP Resource?",
          "How do you structure MCP resource URIs?",
          "How does the mcp Python SDK simplify server development?",
          "How do you handle tool errors and return structured error responses in MCP?",
          "What is the difference between MCP tools and OpenAI function calling tools?",
          "How do you implement pagination for MCP resources that return large datasets?",
          "How do you authenticate requests to an MCP server?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 60,
        week: 9,
        title: "MCP Client Development & Integration",
        topics: ["MCP Client SDK", "Tool Discovery", "Dynamic Tool Invocation", "Client-Side Caching", "Error Handling in Clients"],
        buildTask: "Build an MCP client into the Capstone agent: dynamically discover and invoke tools from the MCP server, integrate tool results into the LangGraph agent loop",
        practiceTask: "Build an MCP client that connects to two different MCP servers, merges their tool manifests, and allows an LLM agent to use tools from both transparently",
        studyQuestions: [
          "How does an MCP client discover available tools from a server?",
          "How do you invoke a tool through the MCP client SDK?",
          "How do you handle the case where an MCP server is unavailable?",
          "How do you cache tool schemas on the client side for performance?",
          "How does MCP client-side error handling work?",
          "How do you connect an MCP client to a LangGraph agent?",
          "What is the difference between connecting to an MCP server via stdio vs SSE?",
          "How do you test an MCP client against a mock server?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 61,
        week: 9,
        title: "MCP Prompts, Sampling & Advanced Patterns",
        topics: ["MCP Prompts", "Sampling API", "Elicitation Pattern", "MCP Server Composition", "Security Boundaries"],
        buildTask: "Add MCP Prompts to the Capstone MCP server: incident_analysis_prompt, runbook_query_prompt, and executive_summary_prompt — test sampling via Claude Desktop",
        practiceTask: "Implement MCP sampling: build a server that uses the MCP sampling API to ask the connected LLM for help generating a resource, demonstrating the two-way protocol",
        studyQuestions: [
          "What are MCP Prompts and how do they differ from tool calls?",
          "What is the MCP Sampling API and how does it enable bidirectional communication?",
          "What is the elicitation pattern in MCP?",
          "How do you compose multiple MCP servers together?",
          "What are the security boundaries an MCP server must enforce?",
          "How do you prevent privilege escalation through MCP tool chains?",
          "What is the difference between an MCP prompt and a system prompt?",
          "How does MCP handle binary data (images, files) in tool responses?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 15, agents: 25, production: 15 }
      },
      {
        day: 62,
        week: 9,
        title: "Multi-Agent Orchestration with LangGraph & MCP",
        topics: ["LangGraph Multi-Agent", "Cross-Agent State Sharing", "MCP-Connected Agents", "Parallel Agent Execution", "Fault Tolerance"],
        buildTask: "Build the complete Capstone multi-agent system in LangGraph: Supervisor → [IncidentAgent via MCP, RunbookAgent via RAG, ReportAgent] with parallel execution and state merging",
        practiceTask: "Build a 3-agent LangGraph system: Researcher (uses MCP web search), Analyst (uses MCP data tools), Writer (synthesizes results) — run in parallel with a supervisor",
        studyQuestions: [
          "How do you implement parallel agent execution in LangGraph?",
          "How do you share state between agents in a LangGraph multi-agent system?",
          "How do you handle one agent failing in a parallel multi-agent workflow?",
          "What is the role of the supervisor in coordinating agent outputs?",
          "How do MCP-connected agents differ from tool-calling agents?",
          "How do you implement timeout and retry for individual agents in a multi-agent system?",
          "What observability data do you need for a multi-agent system in production?",
          "How do you version a multi-agent system when updating individual agents?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 30, production: 15 }
      },
      {
        day: 63,
        week: 9,
        title: "Week 9 Review — Multi-Agent & MCP",
        isReviewDay: true,
        topics: ["Supervisor Patterns", "MCP Server & Client", "MCP Prompts", "Multi-Agent LangGraph", "Production Orchestration"],
        buildTask: "Complete Capstone multi-agent integration: full LangGraph supervisor system connected to the MCP server; run end-to-end test for 10 incident scenarios",
        practiceTask: "Build a complete MCP server + client + multi-agent orchestration system from scratch in 3 hours — without referring to documentation",
        weekSummary: "Week 9 elevated the Capstone to a full multi-agent system with MCP integration. The platform now features a Supervisor agent coordinating specialized sub-agents via MCP tools, enabling external LLM clients (Claude Desktop, etc.) to interact with the AI Operations platform through the MCP protocol.",
        reviewQuestions: [
          "Explain the MCP protocol handshake and capability negotiation flow",
          "How does MCP differ from OpenAI's function calling specification?",
          "Design a multi-agent architecture for autonomous enterprise IT operations",
          "What are the security risks of MCP and how do you mitigate them?",
          "How does a LangGraph supervisor coordinate parallel agent execution?",
          "What is the difference between MCP Tools, Resources, and Prompts?",
          "How do you handle state consistency when multiple agents modify shared state?",
          "What observability infrastructure do you need for a 5-agent production system?",
          "How does MCP sampling enable a server to leverage the client's LLM?",
          "How would you test a multi-agent system that calls external services via MCP?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 10, agents: 30, production: 20 }
      }
    ]
  },

  // ============================================================
  // WEEK 10 — Production Engineering (Days 64–70)
  // ============================================================
  {
    week: 10,
    title: "Production Engineering",
    phase: "Production",
    days: [
      {
        day: 64,
        week: 10,
        title: "Docker — Containerization & Best Practices",
        topics: ["Dockerfile Best Practices", "Multi-Stage Builds", "Layer Caching", "Docker Networking", ".dockerignore"],
        buildTask: "Containerize the entire Capstone application: multi-stage Dockerfiles for the API (FastAPI), MCP server, and ML inference service — minimize image sizes",
        practiceTask: "Write a multi-stage Dockerfile for a FastAPI + ML model service; reduce final image size by >60% using alpine base and multi-stage build",
        studyQuestions: [
          "How do multi-stage Docker builds reduce final image size?",
          "What is Docker layer caching and how do you optimize for it?",
          "What is the difference between COPY and ADD in a Dockerfile?",
          "How do you run a Docker container as a non-root user?",
          "What is the Docker networking bridge mode vs host mode?",
          "How do Docker volumes differ from bind mounts?",
          "How do you handle secrets in Docker containers securely?",
          "What is the difference between CMD and ENTRYPOINT?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 5, production: 30 }
      },
      {
        day: 65,
        week: 10,
        title: "Docker Compose — Multi-Service Orchestration",
        topics: ["Docker Compose Services", "Networking & Dependencies", "Environment Variables", "Health Checks", "Volume Management"],
        buildTask: "Build the Capstone docker-compose.yml: services for FastAPI, PostgreSQL, Redis, Qdrant, Celery workers, and the MCP server with proper health checks and dependencies",
        practiceTask: "Write a Docker Compose file for a complete web application stack (nginx, fastapi, postgres, redis, celery worker, celery flower) with full health checks",
        studyQuestions: [
          "How do Docker Compose service dependencies work with depends_on?",
          "What is the difference between health check success and container readiness?",
          "How do you manage environment variables securely in Docker Compose?",
          "How does service discovery work between Compose services?",
          "What is the difference between docker compose up and docker compose run?",
          "How do you scale a service with Docker Compose?",
          "What is a Docker Compose override file and when is it useful?",
          "How do you handle persistent data across docker compose down / up cycles?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 5, production: 30 }
      },
      {
        day: 66,
        week: 10,
        title: "CI/CD with GitHub Actions",
        topics: ["GitHub Actions Workflows", "Test → Lint → Build → Deploy Pipeline", "Secrets Management", "Docker Build & Push", "Environment Deployments"],
        buildTask: "Build the Capstone CI/CD pipeline in GitHub Actions: on PR → run tests, lint, type check; on merge to main → build Docker images, push to GHCR, run RAGAS eval",
        practiceTask: "Write a complete GitHub Actions workflow that: runs pytest, mypy, flake8; builds a Docker image; pushes to Docker Hub; and deploys to a staging environment",
        studyQuestions: [
          "How do GitHub Actions workflows trigger and what event types are available?",
          "How do you securely store and use secrets in GitHub Actions?",
          "What is a reusable workflow in GitHub Actions?",
          "How do you cache dependencies in GitHub Actions for faster builds?",
          "What is the difference between a job and a step in GitHub Actions?",
          "How do you implement deployment gates (manual approval) in GitHub Actions?",
          "How do you use matrix builds for testing across multiple Python versions?",
          "How do you fail a CI pipeline if code coverage drops below a threshold?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 5, production: 30 }
      },
      {
        day: 67,
        week: 10,
        title: "Cloud Fundamentals — AWS/GCP Core Services",
        topics: ["EC2 / Compute Engine", "S3 / Cloud Storage", "RDS / Cloud SQL", "IAM Roles", "VPC & Security Groups"],
        buildTask: "Architect the Capstone cloud deployment: design the AWS/GCP infrastructure diagram with compute, storage, database, networking, and IAM components",
        practiceTask: "Using AWS CLI or Terraform, provision: an S3 bucket, an RDS PostgreSQL instance, and an EC2 instance — connect them with proper IAM roles and security groups",
        studyQuestions: [
          "What is the difference between EC2 instance types (compute, memory, storage optimized)?",
          "How does AWS IAM work and what is the principle of least privilege?",
          "What is the difference between a security group and a network ACL?",
          "How do S3 bucket policies differ from IAM policies?",
          "What is a VPC and why do you deploy resources inside one?",
          "What is the difference between a public and private subnet?",
          "How do you securely connect an EC2 instance to RDS without exposing RDS publicly?",
          "What is the difference between horizontal and vertical scaling in cloud?"
        ],
        xpRewards: { engineering: 15, ml: 0, llm: 0, agents: 5, production: 30 }
      },
      {
        day: 68,
        week: 10,
        title: "Infrastructure as Code — Terraform Fundamentals",
        topics: ["Terraform Providers & Resources", "State Management", "Variables & Outputs", "Modules", "Plan & Apply Workflow"],
        buildTask: "Write Terraform configuration for the Capstone's cloud infrastructure: VPC, subnets, security groups, RDS, ElastiCache (Redis), and ECS for container orchestration",
        practiceTask: "Write a Terraform module that provisions a complete FastAPI deployment: ECS Fargate service, ALB, RDS, and all networking — apply to a real cloud account",
        studyQuestions: [
          "How does Terraform's state file work and why is remote state important?",
          "What is the difference between terraform plan and terraform apply?",
          "How do Terraform modules improve reusability?",
          "What is terraform import and when do you use it?",
          "How do you handle Terraform state locking in a team environment?",
          "What is the difference between resource and data sources in Terraform?",
          "How do you manage environment-specific configurations (dev/staging/prod) in Terraform?",
          "What is Terraform workspace and when is it appropriate to use?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 5, production: 30 }
      },
      {
        day: 69,
        week: 10,
        title: "Observability — Logging, Metrics & Tracing",
        topics: ["Structured Logging (JSON)", "Prometheus Metrics", "OpenTelemetry Tracing", "Grafana Dashboards", "Alerting Rules"],
        buildTask: "Add full observability to the Capstone: structured JSON logging with correlation IDs, Prometheus metrics for LLM latency/token cost/agent success rate, OpenTelemetry traces",
        practiceTask: "Instrument a FastAPI app with: structured logging (loguru), custom Prometheus metrics (request count, latency histogram), and OpenTelemetry distributed traces",
        studyQuestions: [
          "What are the three pillars of observability?",
          "How does structured logging differ from traditional log lines?",
          "What is a distributed trace and what is a span?",
          "How does Prometheus scrape and store metrics?",
          "What is the difference between a counter, gauge, and histogram in Prometheus?",
          "How do you create a Grafana dashboard for API latency percentiles?",
          "What is correlation ID and how does it help debug distributed systems?",
          "How do you set up alerting rules in Prometheus AlertManager?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 10, production: 30 }
      },
      {
        day: 70,
        week: 10,
        title: "Week 10 Review — Production Engineering",
        isReviewDay: true,
        topics: ["Docker & Compose", "CI/CD Pipelines", "Cloud Infrastructure", "Terraform", "Observability"],
        buildTask: "Complete Capstone production infrastructure: full docker-compose stack, GitHub Actions CI/CD, Terraform cloud IaC, and Grafana observability dashboard",
        practiceTask: "Deploy the full Capstone application to a cloud provider in under 2 hours: Terraform provision, push Docker images via CI/CD, verify with end-to-end smoke tests",
        weekSummary: "Week 10 made the Capstone production-deployable. The platform now has containerized services via Docker Compose, automated CI/CD via GitHub Actions, cloud infrastructure defined in Terraform, and full observability with structured logging, Prometheus metrics, and OpenTelemetry tracing.",
        reviewQuestions: [
          "How would you design a zero-downtime deployment strategy for the Capstone API?",
          "What are the security best practices for Dockerfiles in production?",
          "How does GitHub Actions handle secret rotation without pipeline downtime?",
          "Design a Terraform module structure for a multi-environment AI platform",
          "What is the difference between push-based and pull-based metrics collection?",
          "How do you implement distributed tracing across FastAPI → LangGraph → MCP?",
          "What monitoring metrics matter most for an LLM-powered API?",
          "How do you handle a database migration during a zero-downtime deployment?",
          "What is the principle of least privilege in cloud IAM and how do you implement it?",
          "How do you debug a production incident using logs, metrics, and traces together?"
        ],
        xpRewards: { engineering: 20, ml: 0, llm: 0, agents: 10, production: 30 }
      }
    ]
  },

  // ============================================================
  // WEEK 11 — MLOps / LLMOps (Days 71–77)
  // ============================================================
  {
    week: 11,
    title: "MLOps / LLMOps",
    phase: "Production",
    days: [
      {
        day: 71,
        week: 11,
        title: "MLflow — Experiment Tracking & Model Registry",
        topics: ["MLflow Tracking", "Runs & Experiments", "MLflow Model Registry", "Model Stages", "MLflow Projects"],
        buildTask: "Integrate MLflow into the Capstone: track all ML experiments (incident classifier, anomaly detector), register best models, and automate model promotion from staging to production",
        practiceTask: "Set up MLflow, run 20 experiments varying hyperparameters, log metrics and artifacts, register the best model, and implement model serving with mlflow.pyfunc",
        studyQuestions: [
          "What is MLflow and what are its four core components?",
          "How do you log parameters, metrics, and artifacts in MLflow?",
          "How does the MLflow Model Registry manage model lifecycle?",
          "What is the difference between MLflow Runs and Experiments?",
          "How do you compare experiment runs in the MLflow UI?",
          "What is MLflow autologging and which frameworks support it?",
          "How do you serve a model from the MLflow Model Registry?",
          "How do you integrate MLflow with CI/CD for automated model promotion?"
        ],
        xpRewards: { engineering: 15, ml: 20, llm: 5, agents: 0, production: 30 }
      },
      {
        day: 72,
        week: 11,
        title: "LLMOps — LangSmith & LLM Observability",
        topics: ["LangSmith Tracing", "Run Trees", "Feedback & Annotation", "Dataset Management", "A/B Testing LLM Prompts"],
        buildTask: "Enable LangSmith tracing for all Capstone LLM calls: capture full run trees for agent invocations, annotate good/bad outputs, build an evaluation dataset from production traces",
        practiceTask: "Set up LangSmith project, trace 50 LLM calls, annotate 20 runs with human feedback, and use the dataset to run offline evaluations",
        studyQuestions: [
          "What is LangSmith and how does it differ from generic observability tools?",
          "How does LangSmith capture run trees for multi-step agent invocations?",
          "How do you use LangSmith to build evaluation datasets from production traces?",
          "What is the feedback annotation workflow in LangSmith?",
          "How do you use LangSmith to A/B test two different prompts?",
          "How do you set up LangSmith project for a multi-agent application?",
          "What is the difference between online and offline LLM evaluation?",
          "How do you use LangSmith datasets to run regression tests on prompt changes?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 20, agents: 15, production: 25 }
      },
      {
        day: 73,
        week: 11,
        title: "Latency Optimization — Caching & Streaming",
        topics: ["Semantic Caching", "Redis for LLM Caching", "Streaming Responses", "Async LLM Calls", "Batching Strategies"],
        buildTask: "Optimize Capstone LLM latency: implement semantic caching with Redis (cache similar queries by embedding similarity), add streaming to all user-facing endpoints, batch embedding calls",
        practiceTask: "Benchmark LLM endpoint latency before and after: (1) semantic caching, (2) streaming, (3) async parallel calls — document P50, P95, P99 improvements",
        studyQuestions: [
          "What is semantic caching and how does it reduce LLM API costs?",
          "How do you implement cache invalidation for LLM semantic caches?",
          "What is the difference between LLM streaming and buffered responses?",
          "How does prompt caching (OpenAI API feature) work?",
          "How do you batch multiple embedding requests for efficiency?",
          "What is time-to-first-token (TTFT) and why does it matter for UX?",
          "How do you implement speculative decoding for faster LLM inference?",
          "What are the trade-offs between caching correctness and serving latency?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 20, agents: 10, production: 25 }
      },
      {
        day: 74,
        week: 11,
        title: "Cost Optimization & Model Selection Strategy",
        topics: ["LLM Cost Modeling", "Routing Smaller Models", "Token Compression", "Prompt Optimization for Cost", "Cost Alerting"],
        buildTask: "Build a model router for the Capstone: route simple queries to GPT-4o-mini, complex reasoning to GPT-4o, and code tasks to a specialized model — track cost per query type",
        practiceTask: "Implement an LLM router that classifies query complexity and routes to the cheapest appropriate model; measure cost reduction vs quality degradation across 100 test queries",
        studyQuestions: [
          "How do you estimate monthly LLM API costs from usage metrics?",
          "What is a routing strategy for LLM cost optimization?",
          "How does LLMLingua prompt compression work?",
          "What is the trade-off between model quality and cost for different task types?",
          "How do you implement LLM cost alerting (e.g., alert if daily spend exceeds $X)?",
          "What is mixture of agents (MoA) and how does it trade cost for quality?",
          "How do you benchmark quality degradation when switching to a smaller model?",
          "What is the difference between input and output token costs and how do they affect strategy?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 20, agents: 10, production: 25 }
      },
      {
        day: 75,
        week: 11,
        title: "Data Pipelines & Feature Stores",
        topics: ["ETL vs ELT", "dbt Basics", "Feature Store Concepts", "Apache Airflow Intro", "Data Quality Checks"],
        buildTask: "Build a data pipeline for the Capstone ML models: daily ETL from PostgreSQL operations logs → feature engineering → feature store → model retraining trigger",
        practiceTask: "Build a dbt project that transforms raw incident log data into ML-ready features: clean, aggregate, and test with dbt's built-in data quality assertions",
        studyQuestions: [
          "What is the difference between ETL and ELT pipelines?",
          "What is a feature store and why is it valuable for ML systems?",
          "How does dbt (data build tool) work and what problem does it solve?",
          "How do you orchestrate a daily ML retraining pipeline with Airflow?",
          "What are data quality checks and how do dbt tests implement them?",
          "What is feature drift and how do you detect it?",
          "What is the difference between batch and real-time feature computation?",
          "How do you version features in a feature store?"
        ],
        xpRewards: { engineering: 15, ml: 20, llm: 5, agents: 5, production: 25 }
      },
      {
        day: 76,
        week: 11,
        title: "Model Monitoring & Drift Detection",
        topics: ["Data Drift", "Concept Drift", "Model Performance Monitoring", "Evidently AI", "Alerting on Model Degradation"],
        buildTask: "Add model monitoring to the Capstone: use Evidently AI to detect data drift in incident features, monitor classifier performance over time, and set up drift alerts",
        practiceTask: "Use Evidently AI to generate a data drift report and model performance report for a simulated dataset with introduced drift; set up automated weekly report generation",
        studyQuestions: [
          "What is the difference between data drift and concept drift?",
          "How do you detect data drift in production?",
          "What statistical tests are used for drift detection?",
          "How does Evidently AI work and what reports does it generate?",
          "What is population stability index (PSI) and how do you interpret it?",
          "How do you set up automated alerts when model performance degrades?",
          "What is shadow mode deployment and how does it help detect model issues?",
          "How do you retrain a model in response to detected drift?"
        ],
        xpRewards: { engineering: 15, ml: 25, llm: 5, agents: 5, production: 25 }
      },
      {
        day: 77,
        week: 11,
        title: "Week 11 Review — MLOps / LLMOps",
        isReviewDay: true,
        topics: ["MLflow", "LangSmith", "Latency Optimization", "Cost Management", "Model Monitoring"],
        buildTask: "Complete Capstone MLOps integration: MLflow model registry, LangSmith full tracing, semantic cache, model router, drift monitoring — all in production-ready state",
        practiceTask: "Design and implement a complete MLOps pipeline from scratch: training → experiment tracking → model registry → deployment → monitoring in under 3 hours",
        weekSummary: "Week 11 made the Capstone an observable, cost-optimized, and continuously monitored AI platform. MLflow tracks all ML experiments; LangSmith traces every LLM call; semantic caching cuts costs; the model router directs queries intelligently; and Evidently monitors for drift.",
        reviewQuestions: [
          "Design a complete MLOps pipeline for the Capstone's incident classifier",
          "How would you set up LLM observability for a 10-agent production system?",
          "What strategies reduce LLM costs by 50% without quality loss?",
          "How does semantic caching work and what are its failure modes?",
          "Design a model monitoring strategy for an LLM-powered classification system",
          "What is the difference between online and offline evaluation for LLMs?",
          "How do you roll back a model when drift is detected in production?",
          "How does LangSmith enable continuous LLM quality improvement?",
          "What dbt transformations would you write for an AI system's feature store?",
          "How do you balance LLM API cost vs quality for a high-volume production system?"
        ],
        xpRewards: { engineering: 15, ml: 20, llm: 15, agents: 10, production: 30 }
      }
    ]
  },

  // ============================================================
  // WEEK 12 — Security & System Design (Days 78–84)
  // ============================================================
  {
    week: 12,
    title: "Security & System Design",
    phase: "Production",
    days: [
      {
        day: 78,
        week: 12,
        title: "LLM Security — Prompt Injection & Guardrails",
        topics: ["Prompt Injection Attacks", "Jailbreaking Techniques", "Input Guardrails", "Output Guardrails", "Nemo Guardrails / LlamaGuard"],
        buildTask: "Add comprehensive guardrails to the Capstone: input sanitization to prevent prompt injection, output validation for harmful content, and LlamaGuard integration for safety classification",
        practiceTask: "Red-team your own LLM application with 20 prompt injection attempts; implement input and output guardrails that block all 20 attacks without degrading legitimate use",
        studyQuestions: [
          "What is prompt injection and how does it differ from SQL injection conceptually?",
          "What are the main categories of prompt injection attacks?",
          "How do you implement input-level guardrails for LLM applications?",
          "How does NeMo Guardrails work and what colang is used for?",
          "What is LlamaGuard and how does it classify unsafe content?",
          "How do you prevent indirect prompt injection via tool results?",
          "What is the difference between jailbreaking and prompt injection?",
          "How do you test guardrail coverage comprehensively?"
        ],
        xpRewards: { engineering: 20, ml: 5, llm: 20, agents: 10, production: 25 }
      },
      {
        day: 79,
        week: 12,
        title: "API Security — Rate Limiting, IAM & Zero Trust",
        topics: ["Rate Limiting (Token Bucket, Sliding Window)", "Zero Trust Architecture", "mTLS", "API Gateway Security", "OWASP API Top 10"],
        buildTask: "Harden the Capstone API: implement sliding window rate limiting (per user, per IP), add mTLS for service-to-service communication, and audit against OWASP API Top 10",
        practiceTask: "Implement three rate limiting algorithms from scratch (fixed window, sliding window, token bucket) and benchmark their memory/CPU trade-offs under load",
        studyQuestions: [
          "What is the difference between token bucket and sliding window rate limiting?",
          "How does Zero Trust architecture differ from perimeter security?",
          "What is mutual TLS (mTLS) and when do you use it?",
          "What are the OWASP API Security Top 10 vulnerabilities?",
          "How do you implement rate limiting in a distributed system without a single point of failure?",
          "What is the difference between authentication and authorization at the API gateway?",
          "How do you prevent API key leakage in logs and error messages?",
          "What is PKCE and why is it important for public OAuth2 clients?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 10, agents: 10, production: 25 }
      },
      {
        day: 80,
        week: 12,
        title: "System Design — Scalable AI Platform Architecture",
        topics: ["Horizontal Scaling", "Load Balancing", "Caching Layers", "Database Sharding", "Event-Driven Architecture"],
        buildTask: "Design the Capstone's scaling architecture: load-balanced API tier, Celery worker fleet, Redis caching layer, database read replicas, and an event bus (Kafka/SQS) for async operations",
        practiceTask: "Design a system that can handle 10,000 concurrent LLM requests/second: sketch the full architecture with load balancing, queuing, caching, and database strategy",
        studyQuestions: [
          "How do you horizontally scale a stateful LLM agent service?",
          "What is consistent hashing and why is it used in distributed caching?",
          "When do you use a message queue vs direct API calls in a distributed system?",
          "How does database read replication reduce load and improve availability?",
          "What is the CAP theorem and how does it apply to distributed AI systems?",
          "How do you handle session affinity (sticky sessions) in a load-balanced LLM service?",
          "What is the difference between vertical and horizontal database scaling?",
          "How do you design an AI system that handles graceful degradation under load?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 10, agents: 10, production: 25 }
      },
      {
        day: 81,
        week: 12,
        title: "High Availability & Disaster Recovery",
        topics: ["RTO & RPO", "Database Backups & Point-in-Time Recovery", "Multi-Region Deployment", "Circuit Breakers", "Chaos Engineering"],
        buildTask: "Implement HA patterns in the Capstone: circuit breaker for LLM API calls (failover to secondary model), database backup automation, and a multi-region failover runbook",
        practiceTask: "Implement the Circuit Breaker pattern in Python: states (CLOSED, OPEN, HALF-OPEN), transition thresholds, and recovery testing under simulated failure",
        studyQuestions: [
          "What is the difference between RTO (Recovery Time Objective) and RPO (Recovery Point Objective)?",
          "How does a circuit breaker pattern prevent cascading failures?",
          "What is the difference between active-active and active-passive multi-region deployment?",
          "How do you implement database point-in-time recovery?",
          "What is chaos engineering and how do you implement it safely?",
          "How do you design LLM API fallback (primary model → fallback model)?",
          "What is bulkhead isolation in microservices?",
          "How do you test disaster recovery procedures without downtime?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 5, agents: 5, production: 30 }
      },
      {
        day: 82,
        week: 12,
        title: "Data Privacy, Compliance & AI Ethics",
        topics: ["GDPR/CCPA Principles", "PII Detection & Redaction", "Data Minimization", "AI Fairness & Bias", "Audit Logging"],
        buildTask: "Add privacy compliance to the Capstone: PII detection and redaction from incident logs before LLM processing, audit logging for all agent actions, and a data retention policy",
        practiceTask: "Build a PII detection and redaction pipeline using spaCy and regex: detect and mask names, emails, IPs, phone numbers before sending to LLM APIs",
        studyQuestions: [
          "What are the key requirements of GDPR for AI systems?",
          "How do you detect and redact PII before sending data to external LLM APIs?",
          "What is the right to be forgotten and how do you implement it in an AI system?",
          "How do you audit AI agent actions for compliance?",
          "What is algorithmic bias and how do you detect it in ML models?",
          "What is data minimization and why is it important for LLM applications?",
          "How do you implement a data retention and deletion policy in a database?",
          "What is the difference between anonymization and pseudonymization?"
        ],
        xpRewards: { engineering: 20, ml: 5, llm: 10, agents: 10, production: 25 }
      },
      {
        day: 83,
        week: 12,
        title: "Performance Engineering — Load Testing & Profiling",
        topics: ["Locust Load Testing", "Async Profiling", "Database Query Optimization", "Connection Pooling", "Bottleneck Identification"],
        buildTask: "Load test the Capstone API with Locust: simulate 500 concurrent users running incident analysis flows; identify and fix the top 3 bottlenecks found during testing",
        practiceTask: "Write a Locust test file for a FastAPI + LLM API: simulate 100 concurrent users for 5 minutes; analyze results and optimize the slowest endpoints",
        studyQuestions: [
          "How do you write realistic load test scenarios with Locust?",
          "What is the difference between latency and throughput?",
          "How do you identify database bottlenecks under load?",
          "What is connection pool exhaustion and how do you prevent it?",
          "How do you profile an async Python application under load?",
          "What is the difference between load testing, stress testing, and soak testing?",
          "How do you set SLOs (Service Level Objectives) for an AI API?",
          "How do you optimize a FastAPI endpoint that calls an LLM and a database?"
        ],
        xpRewards: { engineering: 25, ml: 0, llm: 5, agents: 5, production: 30 }
      },
      {
        day: 84,
        week: 12,
        title: "Week 12 Review — Security & System Design",
        isReviewDay: true,
        topics: ["LLM Security", "API Security", "System Design", "High Availability", "Performance"],
        buildTask: "Complete Capstone security hardening: prompt injection protection, rate limiting, circuit breakers, PII redaction, audit logging, and pass a full load test at 500 concurrent users",
        practiceTask: "Design and present a complete system design for a production AI platform supporting 1M requests/day — including all components, trade-offs, and failure modes",
        weekSummary: "Week 12 hardened the Capstone for enterprise production. The platform now has prompt injection protection, guardrails, rate limiting, Zero Trust service communication, circuit breakers for LLM failover, PII redaction for compliance, and has successfully passed 500-user load testing.",
        reviewQuestions: [
          "Design a defense-in-depth security strategy for the Capstone LLM application",
          "How do you detect and prevent indirect prompt injection through MCP tool results?",
          "Design a rate limiting system for 100k LLM API users with Redis",
          "What system design patterns improve reliability for LLM-powered services?",
          "How do you implement a data privacy pipeline for enterprise AI applications?",
          "What is the circuit breaker pattern and how does it handle LLM API failures?",
          "How would you scale the Capstone to handle 10x the current load?",
          "What audit logs are required for an enterprise AI system operating in a regulated industry?",
          "How do you design a multi-tenant AI platform with strong data isolation?",
          "What chaos engineering experiments would you run on the Capstone system?"
        ],
        xpRewards: { engineering: 25, ml: 5, llm: 10, agents: 10, production: 30 }
      }
    ]
  },

  // ============================================================
  // WEEK 13 — Capstone + Interview Prep (Days 85–90)
  // ============================================================
  {
    week: 13,
    title: "Capstone + Interview Prep",
    phase: "Capstone",
    days: [
      {
        day: 85,
        week: 13,
        title: "Capstone Finalization — Integration & End-to-End Testing",
        topics: ["System Integration", "End-to-End Test Suites", "Performance Validation", "Feature Completeness Review", "Documentation Finalization"],
        buildTask: "Run full end-to-end integration of the Enterprise AI Operations Copilot: all components connected (API, agents, RAG, MCP, ML models, monitoring); execute 50-scenario automated test suite",
        practiceTask: "Write and run a comprehensive end-to-end test script that validates every major user workflow in the Capstone system from API call to agent response",
        studyQuestions: [
          "How do you write effective end-to-end tests for a multi-agent AI system?",
          "What is contract testing and how does it help with system integration?",
          "How do you create a feature completeness checklist for a production AI system?",
          "How do you validate that all system components perform within SLO thresholds?",
          "What documentation is essential for an enterprise AI product?",
          "How do you perform a security review before production launch?",
          "What is a smoke test suite and how does it differ from a full test suite?",
          "How do you prepare a system for a production readiness review?"
        ],
        xpRewards: { engineering: 25, ml: 10, llm: 15, agents: 20, production: 30 }
      },
      {
        day: 86,
        week: 13,
        title: "Capstone Demo & Technical Documentation",
        topics: ["Architecture Documentation", "API Reference Docs", "Demo Script Preparation", "README & Setup Guide", "Architecture Decision Records (ADRs)"],
        buildTask: "Create complete technical documentation for the Capstone: architecture diagram (C4 model), API reference, agent behavior documentation, ADRs for key design decisions, and demo video script",
        practiceTask: "Record a 10-minute technical demo of the Capstone showing: incident ingestion → agent analysis → RAG runbook retrieval → structured report generation → MCP tool invocation",
        studyQuestions: [
          "What is the C4 model for software architecture documentation?",
          "What is an Architecture Decision Record (ADR) and when do you write one?",
          "How do you write a README that helps a new engineer onboard in under 30 minutes?",
          "What should a technical demo of an AI system always show?",
          "How do you document an LLM agent's behavior and decision-making for non-technical stakeholders?",
          "What API documentation format is most useful for enterprise clients?",
          "How do you document known limitations and trade-offs of an AI system?",
          "What makes a strong technical project portfolio piece?"
        ],
        xpRewards: { engineering: 20, ml: 5, llm: 15, agents: 15, production: 25 }
      },
      {
        day: 87,
        week: 13,
        title: "Technical Interview Prep — Algorithms & System Design",
        topics: ["Coding Interview Patterns", "System Design Framework (STAR)", "LLM System Design Questions", "Whiteboard Communication", "Time Management"],
        buildTask: "N/A — Interview prep day. Create a personal system design framework document and a cheat sheet of the 20 most important coding patterns with examples",
        practiceTask: "Complete 3 mock technical interviews: (1) LeetCode Medium coding, (2) ML system design, (3) LLM application architecture — time-boxed to interview duration",
        studyQuestions: [
          "How do you structure a system design answer in an interview?",
          "What are the 10 most common coding interview patterns?",
          "How do you design a real-time RAG system in a 45-minute interview?",
          "How do you handle not knowing the answer to a technical question in an interview?",
          "What is the STAR method for behavioral interview questions?",
          "How do you demonstrate production thinking in a system design interview?",
          "What AI/ML system design questions are most common in 2024-2025?",
          "How do you communicate trade-offs clearly during a whiteboard session?"
        ],
        xpRewards: { engineering: 20, ml: 10, llm: 15, agents: 15, production: 20 }
      },
      {
        day: 88,
        week: 13,
        title: "Technical Interview Prep — LLM & Agent-Specific Questions",
        topics: ["LLM Deep Dive Questions", "RAG Architecture Questions", "Agent Design Questions", "MCP & Tool Use Questions", "MLOps Interview Questions"],
        buildTask: "N/A — Interview prep day. Prepare and rehearse answers to the top 30 LLM engineering interview questions using the Capstone as concrete examples for every answer",
        practiceTask: "Do 2 mock interviews focused exclusively on LLM/agent topics: explain how your Capstone's RAG pipeline works, design an agent system for a given problem, discuss trade-offs",
        studyQuestions: [
          "Explain your RAG pipeline architecture end-to-end (using Capstone as example)",
          "How would you design an AI agent system for enterprise IT operations?",
          "What are the failure modes of LLM-based systems and how do you mitigate them?",
          "How do you evaluate an LLM application in production?",
          "What is the difference between fine-tuning and RAG for knowledge injection?",
          "How does the Model Context Protocol improve AI tool integrations?",
          "How do you reduce LLM latency and cost in a high-traffic system?",
          "What observability would you add to a production multi-agent system?"
        ],
        xpRewards: { engineering: 15, ml: 10, llm: 20, agents: 20, production: 15 }
      },
      {
        day: 89,
        week: 13,
        title: "Portfolio, LinkedIn & Job Application Strategy",
        topics: ["GitHub Portfolio Optimization", "LinkedIn Profile for AI Engineers", "Technical Blog Writing", "Resume Optimization", "Job Target Strategy"],
        buildTask: "Publish the Capstone to GitHub with a polished README, add it as a featured project on LinkedIn, write a technical blog post explaining one key design decision",
        practiceTask: "Write a 1500-word technical blog post about your RAG architecture: chunking strategy, embedding model choice, reranking decision — publish on dev.to or Medium",
        studyQuestions: [
          "What should every AI Engineer GitHub profile showcase?",
          "How do you write a resume that gets past ATS for AI engineering roles?",
          "What is the most effective format for a technical portfolio project README?",
          "How do you quantify the impact of AI projects on your resume?",
          "What are the most in-demand AI engineering skills in the current job market?",
          "How do you write a technical blog post that demonstrates engineering depth?",
          "How do you tailor your application for AI/ML engineer vs software engineer roles?",
          "What should you post on LinkedIn to build a visible AI engineering brand?"
        ],
        xpRewards: { engineering: 15, ml: 5, llm: 10, agents: 10, production: 20 }
      },
      {
        day: 90,
        week: 13,
        title: "Final Review — 90 Days of AI Engineering Mastery",
        isReviewDay: true,
        topics: ["Full Stack AI Review", "Capstone Presentation", "Career Roadmap", "Continued Learning Path", "Celebration"],
        buildTask: "Present the complete Enterprise AI Operations Copilot: live demo of all features, walk through architecture decisions, discuss lessons learned and what you would do differently",
        practiceTask: "Complete a comprehensive self-assessment: rate yourself on all 5 XP categories (Engineering, ML, LLM, Agents, Production) and identify 3 areas for continued deepening",
        weekSummary: "Day 90 — 90 days of disciplined, structured AI engineering training complete. You have built an Enterprise AI Operations Copilot encompassing: production FastAPI backend, classical ML and deep learning models, production RAG with RAGAS evaluation, ReAct and LangGraph agents, MCP server/client, containerized deployment, CI/CD, observability, MLOps, security hardening, and a comprehensive interview preparation. You are ready.",
        reviewQuestions: [
          "Walk through the entire Enterprise AI Operations Copilot architecture end-to-end",
          "What were the three most important technical decisions you made and why?",
          "What would you architect differently knowing what you know now?",
          "How would you scale the Capstone to serve 1,000 enterprise clients?",
          "What is the most challenging problem you solved in 90 days?",
          "How has your understanding of LLM engineering evolved from Day 1 to Day 90?",
          "What are the next 3 skills you want to deepen in your AI engineering journey?",
          "How would you explain the Capstone system to a CTO in 5 minutes?",
          "What safety and ethical considerations should every AI engineer keep in mind?",
          "What emerging AI engineering areas (e.g., multi-modal, on-device, compound AI) will you explore next?"
        ],
        xpRewards: { engineering: 30, ml: 20, llm: 25, agents: 25, production: 30 }
      }
    ]
  }
];
