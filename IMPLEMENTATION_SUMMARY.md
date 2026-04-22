# Tic-Tac-Toe Lab Implementation Summary

## ✅ Completed Tasks

### Step 1: Backend Server (Java NanoHTTPD)

- **Status**: Running on `http://localhost:8080/`
- **Endpoints**:
  - `/newgame` - Starts a new game session
  - `/play?x={x}&y={y}` - Processes moves
  - `/undo` - Reverts to previous game state
- **Data Format**: JSON with cells array and instructions string

### Step 2: Frontend - Game Status Display (App.tsx)

**Feature**: Updated instructions element to display game status

✅ **Implementation**:

- Displays whose turn it is (X or O) - Generated from backend as "X-ийн ээлж" (X's turn)
- Shows winner name when game ends - "X яллаа!" or "O яллаа!" (X/O wins!)
- Shows "Draw" message when board is full with no winner
- Uses existing CSS styles (id="instructions")

**Backend Integration**:

- The `GameState.forGame()` method in Java backend generates the instructions string
- Frontend displays this string directly without modification needed

### Step 3: Undo Functionality

**Feature**: Multi-step undo capability with move history tracking

✅ **Implementation in App.tsx**:

```typescript
const [moveHistory, setMoveHistory] = useState<GameState[]>([]);

const play = (x: number, y: number) => async (e: any) => {
  e.preventDefault();
  // Store current state in history before making the move
  setMoveHistory([...moveHistory, gameState]);
  const response = await fetch(`/play?x=${x}&y=${y}`);
  const json = await response.json();
  setGameState({ cells: json.cells, instructions: json.instructions });
};

const undo = async () => {
  if (moveHistory.length === 0) return;
  const response = await fetch("/undo");
  const json = await response.json();
  setGameState({ cells: json.cells, instructions: json.instructions });
  setMoveHistory(moveHistory.slice(0, -1));
};
```

**How it works**:

1. Frontend maintains local `moveHistory` array
2. Before each move, current game state is stored
3. When Undo button clicked:
   - Frontend requests `/undo` from backend
   - Backend reverts to previous state in its history
   - Frontend removes last move from its local history

✅ **Backend Implementation** (already in place):

- `Game` class maintains history as a `List<Game>`
- `undo()` method returns the last game state from history
- History is preserved as immutable data structure

### Step 4: Visual Design Improvements (App.css)

**Modern Professional Color Palette**:

- **Primary Gradient**: Deep Purple to Violet (`#667eea` to `#764ba2`)
- **Player X (Cyan)**: `#0099ff` with glow effect
- **Player O (Red)**: `#ff6b6b` with glow effect
- **Buttons**:
  - New Game: Cyan gradient (`#00d4ff` to `#0099ff`)
  - Undo: Red gradient (`#ff6b6b` to `#ff8e72`)

**Key Improvements**:
✅ **Responsive Design**:

- Board automatically scales on different screen sizes
- Uses CSS Grid with `max-width: 360px` and `aspect-ratio: 1/1`
- Mobile breakpoint at 600px for smaller devices
- Flexible button layout with `flex-wrap: wrap`

✅ **Enhanced Styling**:

- Smooth transitions and hover effects
- Box shadows for depth and modern appearance
- Text shadows on player symbols for visibility
- Gradient backgrounds throughout for modern look
- Rounded corners (border-radius) for polished appearance
- Smooth animations on button hover (translateY, scale)

✅ **Cell Styling**:

```css
.cell.player-x {
  color: #0099ff;
  text-shadow: 0 0 12px rgba(0, 153, 255, 0.4);
  background-color: #f0f7ff;
}

.cell.player-o {
  color: #ff6b6b;
  text-shadow: 0 0 12px rgba(255, 107, 107, 0.4);
  background-color: #fff5f5;
}

.cell.playable:hover {
  background: linear-gradient(135deg, #ffffff 0%, #ecf0f1 100%);
  transform: scale(1.02);
  box-shadow: inset 0 0 10px rgba(102, 126, 234, 0.3);
}
```

## Running the Application

### Terminal 1 - Backend (Java):

```bash
cd back-end
mvn exec:java -Dexec.mainClass="game.App"
```

Runs on: `http://localhost:8080/`

### Terminal 2 - Frontend (React):

```bash
cd front-end
npm start
```

Runs on: `http://localhost:3000/`

Access the app at: **`http://localhost:3000/`**

## Proxy Configuration

- Frontend is configured with proxy in `package.json`
- API requests to `/newgame`, `/play`, `/undo` are automatically routed to `http://localhost:8080/`
- No CORS issues due to proxy configuration

## Technology Stack

- **Backend**: Java with NanoHTTPD server
- **Frontend**: React with TypeScript
- **Styling**: CSS3 with gradients and animations
- **Communication**: JSON over HTTP

## Features Implemented

✅ Turn indicator (X or O)
✅ Winner display
✅ Draw game detection
✅ Multi-step undo with history tracking
✅ Responsive design (mobile & desktop)
✅ Modern professional UI
✅ Distinct colors for X and O symbols
✅ Smooth animations and hover effects
✅ Backend-frontend synchronization

## Notes

- Backend maintains game state and history
- Frontend tracks additional UI state for undo button
- Undo functionality works seamlessly across multiple moves
- Responsive design adapts to screen sizes from 280px to 1200px+
