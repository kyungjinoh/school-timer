import './style.css';

// Redirect to main domain if there's a specific school path in the URL
(function() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // List of school paths that should redirect to main domain
    const schoolPaths = [
        '/americanheritageschools',
        '/thedaltonschool',
        '/thequarrylaneschool',
        '/ethicalculturefieldstonschool',
        '/blairacademy',
        '/thevillageschool',
        '/ransomevergladesschool',
        '/miltonacademy',
        '/theawtyinternationalschool',
        '/georgetowndayschool',
        '/maspethhighschool',
        '/stjosephbytheseahs',
        '/statenislandtechnicalhs',
        '/susanewagnerhs',
        '/archbishopmolloyhs',
        '/benjaminncardozohs',
        '/foresthillshs',
        '/francislewishs',
        '/richmondhillhs',
        '/stfrancispreparatoryschool',
        '/townsendharrishs',
        '/vanguardhs',
        '/stuyvesanths',
        '/brooklyntechnicalhs',
        '/edwardrmurrowhs',
        '/forthamiltonhs',
        '/jamesmadisonhs',
        '/leonmgoldsteinhs',
        '/midwoodhs',
        '/polyprepcountrydayschool',
        '/saintannsschool',
        '/xaverianhs',
        '/harrystrumanhs',
        '/lacaadahs',
        '/orangecountyschooloftheartsocsa',
        '/redondounionhs',
        '/southpasadenaseniorhs',
        '/irvinehs',
        '/portolahs',
        '/diamondbarhs',
        '/cerritoshs',
        '/laquintahs',
        '/northwoodhs',
        '/sunnyhillshs',
        '/glenawilsonhs',
        '/woodbridgehs',
        '/arnoldobeckmanhs',
        '/fountainvalleyhs',
        '/elsegundohs',
        '/crescentavalleyhs',
        '/miracostahs',
        '/walterpaytoncollegepreparatoryhs',
        '/northsidecollegepreparatoryhs',
        '/choaterosemaryhall',
        '/phillipsacademyandover',
        '/phillipsexeteracademy',
        '/harvardwestlakeschool',
        '/thepingryschool',
        '/stjohnsschool',
        '/ryecountrydayschool',
        '/horacemannschool',
        '/trinityschool',
        '/bellarminecollegeprep',
        '/sidwellfriendsschool',
        '/montavistahs',
        '/troyhs',
        '/saratogahs',
        '/doughertyvalleyhs',
        '/lelandhs',
        '/delnortehs',
        '/westviewhs',
        '/carlmonths',
        '/downtownmagnetshs',
        '/universityhighschoolirvine',
        '/evergreenvalleyhs',
        '/paloaltohspaly',
        '/scrippsranchhs',
        '/foothillhs',
        '/acalaneshs',
        '/carmelhs',
        '/dublinhs',
        '/arcadiahs',
        '/losgatoshs',
        '/montevistahs',
        '/torreypineshs',
        '/lagunabeachhs',
        '/burlingamehs',
        '/tamalpaishs',
        '/alisoniguelhs',
        '/piedmonthillshs',
        '/nestm',
        '/eastsidecommunityschool',
        '/lanetechnicalhs',
        '/whitneymyoungmagneths',
        '/jonescollegeprephs',
        '/lincolnparkhs',
        '/riversidebrookfieldhighschool',
        '/vonsteubenmetrosciencehs',
        '/riversidestemacademy',
        '/bronxhsofscience',
        '/millennium612collegiateacademy',
        '/lynbrookhs',
        '/walnuthillshs',
        '/missionsanjosehs',
        '/canyoncrestacademy'
    ];
    
    // Check if this is a schoolclicker.com domain with a matching school path
    // Only redirect if we have a path AND it matches a school path
    const normalizedPath = pathname.toLowerCase().replace(/\/$/, ''); // Remove trailing slash
    
    if ((hostname === 'www.schoolclicker.com' || hostname === 'schoolclicker.com') && 
        normalizedPath && 
        normalizedPath !== '/' && 
        schoolPaths.includes(normalizedPath)) {
        // If on www subdomain, redirect to non-www; otherwise redirect to root
        if (hostname === 'www.schoolclicker.com') {
            window.location.replace('https://schoolclicker.com');
        } else {
            // Already on main domain, redirect to root
            window.location.replace('https://schoolclicker.com');
        }
    }
})();

function getNextMonday3PMEST() {
    const now = new Date();
    const estFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    
    // Get current time in EST/EDT
    const estParts = estFormatter.formatToParts(now);
    const getPart = (type) => parseInt(estParts.find(p => p.type === type)?.value || '0');
    const estDayOfWeek = estParts.find(p => p.type === 'weekday').value;
    const estHour = getPart('hour');
    
    // Determine days until next Monday
    const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
    let daysUntilMonday = (8 - dayMap[estDayOfWeek]) % 7;
    
    // If it's Monday and before 3pm, target today; otherwise next Monday
    if (estDayOfWeek === 'Monday' && estHour < 15) {
        daysUntilMonday = 0;
    } else if (daysUntilMonday === 0) {
        daysUntilMonday = 7;
    }
    
    // Calculate what date it will be in EST after adding daysUntilMonday
    // We need to find a date that when viewed in EST, is Monday
    let testDate = new Date(now);
    let found = false;
    let attempts = 0;
    
    // Search forward to find the Monday in EST timezone
    while (!found && attempts < 14) {
        testDate.setDate(now.getDate() + daysUntilMonday + attempts);
        
        const testEstParts = estFormatter.formatToParts(testDate);
        const testDayOfWeek = testEstParts.find(p => p.type === 'weekday').value;
        const testYear = parseInt(testEstParts.find(p => p.type === 'year').value);
        const testMonth = parseInt(testEstParts.find(p => p.type === 'month').value) - 1;
        const testDay = parseInt(testEstParts.find(p => p.type === 'day').value);
        
        if (testDayOfWeek === 'Monday') {
            // Found Monday in EST, create date string for 3pm EST/EDT
            const estDateStr = `${testYear}-${String(testMonth + 1).padStart(2, '0')}-${String(testDay).padStart(2, '0')}T15:00:00-05:00`;
            const edtDateStr = `${testYear}-${String(testMonth + 1).padStart(2, '0')}-${String(testDay).padStart(2, '0')}T15:00:00-04:00`;
            
            // Try EST first
            const estDate = new Date(estDateStr);
            const estCheck = estFormatter.formatToParts(estDate);
            if (estCheck.find(p => p.type === 'weekday').value === 'Monday' && 
                parseInt(estCheck.find(p => p.type === 'hour').value) === 15) {
                return estDate;
            }
            
            // Try EDT
            const edtDate = new Date(edtDateStr);
            const edtCheck = estFormatter.formatToParts(edtDate);
            if (edtCheck.find(p => p.type === 'weekday').value === 'Monday' && 
                parseInt(edtCheck.find(p => p.type === 'hour').value) === 15) {
                return edtDate;
            }
            
            // If both fail, try EST (fallback)
            return estDate;
        }
        attempts++;
    }
    
    // Ultimate fallback
    testDate.setDate(now.getDate() + daysUntilMonday);
    return new Date(`${testDate.getFullYear()}-${String(testDate.getMonth() + 1).padStart(2, '0')}-${String(testDate.getDate()).padStart(2, '0')}T15:00:00-05:00`);
}

function updateCountdown() {
    const targetDate = getNextMonday3PMEST();
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        // If we've passed the target, calculate next Monday
        const nextTarget = getNextMonday3PMEST();
        const nextDiff = nextTarget - now;
        
        const days = Math.floor(nextDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((nextDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((nextDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((nextDiff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

