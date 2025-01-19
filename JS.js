
  let startStation = null;
  let endStation = null;
  let isSelectingStart = true; // true: 출발지 선택 중, false: 도착지 선택 중

  // 역 정보
  const subwayGraph = {
   "1호선": {
        "오류동": { "개봉": 2 },
        "개봉": { "오류동": 2, "구일": 2 },
        "구일": { "개봉": 2, "구로": 2 },
        "구로": { "구일": 2, "신도림": 2 },
        "신도림": { "구로": 2, "영등포": 2 },
        "영등포": { "신도림": 2, "신길": 2 },
        "신길": { "영등포": 2, "대방": 1 },
        "대방": { "신길": 1, "노량진": 2 },
        "노량진": { "대방": 2, "용산": 3 },
        "용산": { "노량진": 3, "남영": 2 },
        "남영": { "용산": 2, "서울역": 2 },
        "서울역": { "남영": 2, "시청": 2 },
        "시청": { "서울역": 2, "종각": 2 },
        "종각": { "시청": 2, "종로3가": 2 },
        "종로3가": { "종각": 2, "종로5가": 1 },
        "종로5가": { "종로3가": 1, "동대문": 2 },
        "동대문": { "종로5가": 2, "동묘앞": 2 },
        "동묘앞": { "동대문": 2, "신설동": 2 },
        "신설동": { "동묘앞": 2, "제기동": 1 },
        "제기동": { "신설동": 1, "청량리": 3 },
        "청량리": { "제기동": 3, "회기": 3 },
        "회기": { "청량리": 3 }
    },
    
    "2호선": {
        "왕십리": { "상왕십리": 1 },
        "상왕십리": { "왕십리": 1, "신당": 1 },
        "신당": { "상왕십리": 1, "동대문역사문화공원": 2 },
        "동대문역사문화공원": { "신당": 2, "을지로4가": 1 },
        "을지로4가": { "동대문역사문화공원": 1, "을지로3가": 1 },
        "을지로3가": { "을지로4가": 1, "을지로입구": 1 },
        "을지로입구": { "을지로3가": 1, "시청": 1 },
        "시청": { "을지로입구": 1, "충정로": 1 },
        "충정로": { "시청": 1, "아현": 1 },
        "아현": { "충정로": 1, "이대": 1 },
        "이대": { "아현": 1, "신촌": 1 },
        "신촌": { "이대": 1, "홍대입구": 2 },
        "홍대입구": { "신촌": 2, "합정": 1 },
        "합정": { "홍대입구": 1, "당산": 3 },
        "당산": { "합정": 3, "영등포구청": 1 },
        "영등포구청": { "당산": 1, "문래": 1 },
        "문래": { "영등포구청": 1, "신도림": 2 },
        "신도림": { "문래": 2, "대림": 2 },
        "대림": { "신도림": 2, "구로디지털단지": 2 },
        "구로디지털단지": { "대림": 2, "신대방": 2 },
        "신대방": { "구로디지털단지": 2, "신림": 2 },
        "신림": { "신대방": 2 }
    },

    "4호선": {
        "대공원": { "경마공원":1},
        "경마공원": { "대공원": 2 , "선바위" : 1},
        "선바위": { "경마공원": 2, "남태령": 3 },
        "남태령": { "선바위": 3, "사당": 3 },
        "사당": { "남태령": 3, "총신대입구(이수)": 3 },
        "총신대입구(이수)": { "사당": 3, "동작": 3 },
        "동작": { "총신대입구(이수)": 3, "이촌": 3 },
        "이촌": { "동작": 3, "신용산": 2 },
        "신용산": { "이촌": 2, "삼각지": 1 },
        "삼각지": { "신용산": 1, "숙대입구": 2 },
        "숙대입구": { "삼각지": 2, "서울역": 2 },
        "서울역": { "숙대입구": 2, "회현": 3 },
        "회현": { "서울역": 3, "명동": 2 },
        "명동": { "회현": 2, "충무로": 1 },
        "충무로": { "명동": 1, "동대문역사문화공원": 2 },
        "동대문역사문화공원": { "충무로": 2, "동대문": 1 },
        "동대문": { "동대문역사문화공원": 1, "혜화": 2 },
        "혜화": { "동대문": 2, "한성대입구": 1 },
        "한성대입구": { "혜화": 1, "성신여대입구": 2 },
        "성신여대입구": { "한성대입구": 2, "길음": 2 },
        "길음": { "성신여대입구": 2, "미아사거리": 2 },
        "미아사거리": { "길음": 2 }
    },

    "경의중앙선": {
        "서울역": { "신촌(경의중앙선)": 5 },
        "신촌(경의중앙선)": { "서울역": 5, "가좌": 3 },
        "가좌": { "신촌(경의중앙선)": 3, "디지털미디어시티": 2 },
        "디지털미디어시티": { "가좌": 2, "수색": 2 },
        "수색": { "디지털미디어시티": 2, "한국항공대": 3 },
        "한국항공대": { "수색": 3, "강매": 3 },
        "강매": { "한국항공대": 3, "행신": 2 },
        "행신": { "강매": 2, "능곡": 3 },
        "능곡": { "행신": 3, "대곡": 2 },
        "대곡": { "능곡": 2, "곡산": 2 },
        "곡산": { "대곡": 2 }
    },

    "공항철도": {
        "서울역": { "공덕": 4 },
        "공덕": { "서울역": 4, "홍대입구": 3 },
        "홍대입구": { "공덕": 3, "디지털미디어시티": 3 },
        "디지털미디어시티": { "홍대입구": 3, "마곡나루": 7 },
        "마곡나루": { "디지털미디어시티": 7, "김포공항": 3 },
        "김포공항": { "마곡나루": 3, "계양": 6 },
        "계양": { "김포공항": 6, "검암": 5 },
        "검암": { "계양": 5, "청라국제도시": 5 },
        "청라국제도시": { "검암": 5, "영종": 8 },
        "영종": { "청라국제도시": 8, "운서": 3 },
        "운서": { "영종": 3 , "공항화물청사" : 5},
        "공항화물청사": { "운서": 5, "인천공항1터미널": 4 },
        "인천공항1터미널": { "공항화물청사": 4, "인천공항2터미널": 6 },
        "인천공항2터미널": { "인천공항1터미널": 6}
      }
  };

// 전체 역 목록을 객체 형태로 구성
const stations = {
    "회기": { line: 1, coordinates: [900, 300] },
    "청량리": { line: 1, coordinates: [850, 300] },
    "제기동": { line: 1, coordinates: [800, 300] },
    "신설동": { line: 1, coordinates: [750, 300] },
    "동묘앞": { line: 1, coordinates: [700, 300] },
    "동대문": { line: 1, coordinates: [650, 300] },
    "종로5가": { line: 1, coordinates: [600, 300] },
    "종로3가": { line: 1, coordinates: [550, 300] },
    "종각": { line: 1, coordinates: [490, 345] },
    "시청": { line: 1, coordinates: [450, 400] },
    "서울역": { line: 1, coordinates: [450, 500] },
    "남영": { line: 1, coordinates: [450, 550] },
    "용산": { line: 1, coordinates: [450, 600] },
    "노량진": { line: 1, coordinates: [450, 660] },
    "대방": { line: 1, coordinates: [400, 690] },
    "신길": { line: 1, coordinates: [350, 690] },
    "영등포": { line: 1, coordinates: [300, 690] },
    "신도림": { line: 1, coordinates: [250, 690] },
    "구로": { line: 1, coordinates: [200, 770] },
    "구일": { line: 1, coordinates: [200, 850] },
    "개봉": { line: 1, coordinates: [200, 930] },
    "오류동": { line: 1, coordinates: [200, 1010] },

    // 2호선
    "왕십리": { line: 2, coordinates: [900, 330] },
    "상왕십리": { line: 2, coordinates: [830, 330] },
    "신당": { line: 2, coordinates: [750, 330] },
    "동대문역사문화공원": { line: 2, coordinates: [630, 340] },
    "을지로4가": { line: 2, coordinates: [585, 350] },
    "을지로3가": { line: 2, coordinates: [540, 360] },
    "을지로입구": { line: 2, coordinates: [495, 370] },
    "시청": { line: 2, coordinates: [450, 380] },
    "충정로": { line: 2, coordinates: [450, 340] },
    "아현": { line: 2, coordinates: [433, 295] },
    "이대": { line: 2, coordinates: [380, 280] },
    "신촌": { line: 2, coordinates: [340, 280] },
    "홍대입구": { line: 2, coordinates: [300, 490] },
    "합정": { line: 2, coordinates: [300, 520] },
    "당산": { line: 2, coordinates: [300, 560] },
    "영등포구청": { line: 2, coordinates: [300, 600] },
    "문래": { line: 2, coordinates: [300, 640] },
    "신도림": { line: 2, coordinates: [250, 670] },
    "대림": { line: 2, coordinates: [210, 670] },
    "구로디지털단지": { line: 2, coordinates: [150, 670] },
    "신대방": { line: 2, coordinates: [120, 750] },
    "신림": { line: 2, coordinates: [120, 850] },

    // 4호선
    "미아사거리": { line: 4, coordinates: [800, 150] },
    "길음": { line: 4, coordinates: [750, 150] },
    "성신여대입구": { line: 4, coordinates: [700, 150] },
    "한성대입구": { line: 4, coordinates: [650, 200] },
    "혜화": { line: 4, coordinates: [650, 250] },
    "동대문": { line: 4, coordinates: [650, 300] },
    "동대문역사문화공원": { line: 4, coordinates: [650, 340] },
    "충무로": { line: 4, coordinates: [600, 380] },
    "명동": { line: 4, coordinates: [550, 380] },
    "회현": { line: 4, coordinates: [500, 410] },
    "서울역": { line: 4, coordinates: [470, 500] },
    "숙대입구": { line: 4, coordinates: [500, 560] },
    "삼각지": { line: 4, coordinates: [560, 580] },
    "신용산": { line: 4, coordinates: [640, 660] },
    "이촌": { line: 4, coordinates: [640, 720] },
    "동작": { line: 4, coordinates: [640, 780] },
    "총신대입구(이수)": { line: 4, coordinates: [640, 840] },
    "사당": { line: 4, coordinates: [640, 900] },
    "남태령": { line: 4, coordinates: [640, 960] },
    "선바위": { line: 4, coordinates: [640, 1020] },
    "경마공원": { line: 4, coordinates: [640, 1080] },
    "대공원": { line: 4, coordinates: [640, 1140] },

    // 경의중앙선
    "서울역": { line: 'kgj', coordinates: [430, 500] },
    "신촌": { line: 'kgj', coordinates: [340, 300] },
    "가좌": { line: 'kgj', coordinates: [250, 300] },
    "디지털미디어시티": { line: 'kgj', coordinates: [210, 300] },
    "수색": { line: 'kgj', coordinates: [160, 220] },
    "한국항공대": { line: 'kgj', coordinates: [160, 180] },
    "강매": { line: 'kgj', coordinates: [160, 140] },
    "행신": { line: 'kgj', coordinates: [140, 90] },
    "능곡": { line: 'kgj', coordinates: [100, 90] },
    "대곡": { line: 'kgj', coordinates: [60, 90] },
    "곡산": { line: 'kgj', coordinates: [10, 90] },

    // 공항철도
    "인천공항2터미널": { line: 'ar', coordinates: [10, 1100] },
    "인천공항1터미널": { line: 'ar', coordinates: [10, 1030] },
    "공항화물청사": { line: 'ar', coordinates: [10, 960] },
    "운서": { line: 'ar', coordinates: [10, 890] },
    "영종": { line: 'ar', coordinates: [10, 820] },
    "청라국제도시": { line: 'ar', coordinates: [10, 600] },
    "검암": { line: 'ar', coordinates: [10, 550] },
    "계양": { line: 'ar', coordinates: [30, 375] },
    "김포공항": { line: 'ar', coordinates: [90, 320] },
    "마곡나루": { line: 'ar', coordinates: [140, 320] },
    "디지털미디어시티": { line: 'ar', coordinates: [210, 320] },
    "홍대입구": { line: 'ar', coordinates: [280, 490] },
    "공덕": { line: 'ar', coordinates: [340, 540] }

};


// 선택 정보 업데이트
const updateInfo = () => {
    const info = document.getElementById("selectionInfo");
    info.textContent = `출발지: ${startStation || "없음"}, 도착지: ${endStation || "없음"}`;
};

// 모든 역 색상 초기화
const resetStationColors = () => {
    document.querySelectorAll(".station").forEach((circle) => {
        circle.classList.remove("selected", "end-selected", "intermediate");
        circle.style.fill = "white";
    });
};
// 경로 탐색 함수 (BFS 방식)
const findPath = (start, end) => {
    const queue = [[start]]; // BFS 큐
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift(); // 현재 경로
        const station = path[path.length - 1]; // 현재 역

        if (station === end) return path; // 도착 역에 도달하면 경로 반환
        if (!visited.has(station)) {
            visited.add(station);

            // 현재 역에서 연결된 모든 역 탐색
            for (const line in subwayGraph) {
                if (station in subwayGraph[line]) {
                    for (const neighbor in subwayGraph[line][station]) {
                        if (!visited.has(neighbor)) {
                            queue.push([...path, neighbor]);
                        }
                    }
                }
            }
        }
    }

    return null; // 연결된 경로가 없으면 null 반환
};

// 예상 이동 시간 계산 함수
const calculateTotalTime = (path) => {
    let totalTime = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const station = path[i];
        const nextStation = path[i + 1];

        for (const line in subwayGraph) {
            if (subwayGraph[line][station] && subwayGraph[line][station][nextStation]) {
                totalTime += subwayGraph[line][station][nextStation];
                break;
            }
        }
    }

    return totalTime;
};

// 환승 경로 계산 함수
const calculateTransferStations = (path) => {
    if (!path || path.length < 2) return [];

    const transfers = [];
    let currentLine = null;

    for (let i = 0; i < path.length - 1; i++) {
        const station = path[i];
        const nextStation = path[i + 1];
        let foundLine = null;

        for (const line in subwayGraph) {
            if (station in subwayGraph[line] && nextStation in subwayGraph[line][station]) {
                foundLine = line;
                break;
            }
        }

        if (currentLine && foundLine && currentLine !== foundLine) {
            transfers.push(`${station} - ${currentLine} → ${foundLine}`);
        }

        currentLine = foundLine;
    }

    return transfers;
};

// 결과를 <div id="result">에 출력하는 함수
const displayResult = (path) => {
    const resultDiv = document.querySelector("#result");
    resultDiv.innerHTML = "";

    if (!path) {
        resultDiv.textContent = "출발역과 도착역이 연결되지 않았습니다.";
        return;
    }

    const transfers = calculateTransferStations(path);
    const transferText = transfers.length > 0 ? transfers.join("<br>") : "환승 없음";
    const totalTime = calculateTotalTime(path);

    resultDiv.innerHTML = `
    <p>경로: ${path.join(" → ")}</p>
    <p>환승 경로: <br>${transferText}</p>
    <p>예상 이동 시간: 약 ${totalTime}분</p>
  `;
};

// 경로 강조 (중간 역을 초록색으로 표시)
const highlightIntermediateStations = (path) => {
    path.forEach((station) => {
        if (station !== startStation && station !== endStation) {
            const stationElement = document.querySelector(`.station[data-name="${station}"]`);
            if (stationElement) {
                stationElement.style.fill = "green";
                stationElement.classList.add("intermediate");
            }
        }
    });
};

// 출발지 또는 도착지를 설정하는 함수
const setStation = (stationName) => {
    if (isSelectingStart) {
        resetStationColors(); // 모든 역 색상 초기화
        startStation = stationName;
        isSelectingStart = false; // 다음 선택은 도착지
        document.getElementById("start-station").value = stationName;
        document.getElementById("end-station").value = '';

        const startElement = document.querySelector(`.station[data-name="${stationName}"]`);
        if (startElement) {
            startElement.style.fill = "blue"; // 출발지: 파란색
        }
    } else {
        endStation = stationName;
        document.getElementById("end-station").value = stationName;
        const endElement = document.querySelector(`.station[data-name="${stationName}"]`);
        if (endElement) {
            endElement.style.fill = "red"; // 도착지: 빨간색
        }

        const path = findPath(startStation, endStation);
        if (path) {
            highlightIntermediateStations(path);
            displayResult(path);
        } else {
            alert("경로를 찾을 수 없습니다.");
        }
        isSelectingStart = true; // 다시 출발지 선택으로 전환
    }
    updateInfo();
};

// 텍스트 입력 이벤트 핸들러
document.getElementById("route-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const start = document.getElementById("start-station").value.trim();
    const end = document.getElementById("end-station").value.trim();

    // 모든 호선에서 출발지와 도착지를 확인
    const isValidStation = (station) => {
        return Object.keys(subwayGraph).some(line => station in subwayGraph[line]);
    };

    if (!isValidStation(start)) {
        alert("출발지가 올바르지 않습니다.");
        return;
    }
    if (!isValidStation(end)) {
        alert("도착지가 올바르지 않습니다.");
        return;
    }

    setStation(start);
    setStation(end);
});

// 역 클릭 이벤트 핸들러
document.querySelectorAll(".station").forEach((circle) => {
    circle.addEventListener("click", (event) => {
        const stationName = event.target.getAttribute("data-name");
        event.target.classList.add("selected");
        event.target.style.fill = "blue"; // 출발지: 파란색
        setStation(stationName);
    });
});

// 버튼 클릭 이벤트 핸들러
document.querySelector("#find-path-btn").addEventListener("click", () => {
    const start = document.querySelector("#start-station").value.trim();
    const end = document.querySelector("#end-station").value.trim();

    if (!start || !end) {
        alert("출발역과 도착역을 입력해주세요.");
        return;
    }

    const path = findShortestPath(start, end);
    displayResult(path);
});

// 버튼 클릭 이벤트 핸들러
document.querySelector("#find-path-btn").addEventListener("click", () => {
    const start = document.querySelector("#start-station").value.trim();
    const end = document.querySelector("#end-station").value.trim();

    if (!start || !end) {
        alert("출발역과 도착역을 입력해주세요.");
        return;
    }

    const path = findShortestPath(start, end);
    displayResult(path);
});

// 다익스트라 알고리즘 함수
const findShortestPath = (start, end) => {
    const distances = {}; // 각 역까지의 최단 거리를 저장
    const previous = {}; // 최단 경로 트래킹
    const queue = new PriorityQueue(); // 우선순위 큐 (최소 거리 기준)

    // 초기화
    for (const line in subwayGraph) {
        for (const station in subwayGraph[line]) {
            distances[station] = Infinity;
            previous[station] = null;
        }
    }
    distances[start] = 0;
    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
        const { element: currentStation } = queue.dequeue();

        if (currentStation === end) break; // 도착역에 도달하면 종료

        for (const line in subwayGraph) {
            if (currentStation in subwayGraph[line]) {
                for (const neighbor in subwayGraph[line][currentStation]) {
                    const newDistance = distances[currentStation] + subwayGraph[line][currentStation][neighbor];

                    if (newDistance < distances[neighbor]) {
                        distances[neighbor] = newDistance;
                        previous[neighbor] = currentStation;
                        queue.enqueue(neighbor, newDistance);
                    }
                }
            }
        }
    }

    // 최단 경로 복원
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return { path, totalTime: distances[end] };
};

// 우선순위 큐 
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}



// 초기 정보 표시
updateInfo();