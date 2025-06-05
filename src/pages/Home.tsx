<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Protect Your Home: 12 Questions to Vet Waterproofing Pros</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
            --primary-yellow: #ffd700;
            --secondary-yellow: #ffed4e;
            --light-yellow: #fff176;
            --dark-black: #0a0a0a;
            --medium-black: #1a1a1a;
            --light-black: #2d2d2d;
            --pure-white: #ffffff;
            --off-white: #fafafa;
            --border-light: rgba(255, 255, 255, 0.1);
            --border-medium: rgba(255, 255, 255, 0.2);
            --shadow-yellow: rgba(255, 215, 0, 0.3);
            --shadow-dark: rgba(0, 0, 0, 0.2);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--dark-black);
            min-height: 100vh;
            line-height: 1.6;
            overflow-x: hidden;
            position: relative;
        }
        
        /* Advanced Background with Animated Particles */
        .background-effects {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }
        
        .gradient-orb {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary-yellow) 0%, transparent 70%);
            animation: float 20s ease-in-out infinite;
            opacity: 0.1;
        }
        
        .gradient-orb:nth-child(1) {
            width: 600px;
            height: 600px;
            top: -300px;
            left: -300px;
            animation-delay: 0s;
        }
        
        .gradient-orb:nth-child(2) {
            width: 400px;
            height: 400px;
            top: 50%;
            right: -200px;
            animation-delay: -10s;
        }
        
        .gradient-orb:nth-child(3) {
            width: 300px;
            height: 300px;
            bottom: -150px;
            left: 30%;
            animation-delay: -5s;
        }
        
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(30px, -30px) rotate(90deg); }
            50% { transform: translate(-20px, 20px) rotate(180deg); }
            75% { transform: translate(-30px, -10px) rotate(270deg); }
        }
        
        .floating-particles {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-yellow);
            border-radius: 50%;
            opacity: 0.3;
            animation: particle-float 15s linear infinite;
        }
        
        @keyframes particle-float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
        
        .dev-notice {
            background: linear-gradient(135deg, var(--primary-yellow) 0%, var(--secondary-yellow) 100%);
            color: var(--medium-black);
            padding: 12px 20px;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            position: relative;
            overflow: hidden;
            border-bottom: 2px solid var(--light-yellow);
        }
        
        .dev-notice::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 4s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 80px 20px;
            position: relative;
        }
        
        .hero-section {
            text-align: center;
            color: white;
            margin-bottom: 120px;
            position: relative;
            padding: 60px 0;
            overflow: hidden;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: -150px;
            left: 50%;
            transform: translateX(-50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(255,215,0,0.06) 0%, rgba(255,215,0,0.02) 50%, transparent 70%);
            z-index: -1;
            animation: hero-ambient 12s ease-in-out infinite;
        }
        
        @keyframes hero-ambient {
            0%, 100% { 
                transform: translateX(-50%) scale(1) rotate(0deg);
                opacity: 0.6;
            }
            50% { 
                transform: translateX(-50%) scale(1.1) rotate(180deg);
                opacity: 1;
            }
        }
        
        .hero-section::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255,215,0,0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,215,0,0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255,255,255,0.02) 0%, transparent 50%);
            z-index: -1;
            animation: ambient-shift 20s ease-in-out infinite;
        }
        
        @keyframes ambient-shift {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }
        
        .hero-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 32px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }
        
        .hero-badge::before {
            content: '🏠';
            margin-right: 8px;
        }
        
        .hero-section h1 {
            font-size: clamp(2.4rem, 5.5vw, 4rem);
            font-weight: 900;
            margin-bottom: 40px;
            background: linear-gradient(135deg, 
                #ffffff 0%, 
                #f8f9fa 20%,
                #ffffff 40%,
                #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.15;
            letter-spacing: -0.025em;
            text-align: center;
            position: relative;
            padding: 0 20px;
            animation: headline-fade-in 1.2s ease-out;
            max-width: 1000px;
            margin-left: auto;
            margin-right: auto;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .hero-section h1::before {
            content: '';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, 
                transparent, 
                var(--primary-yellow), 
                transparent);
            border-radius: 2px;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
        }
        
        .hero-section h1 .highlight {
            background: linear-gradient(135deg, 
                var(--primary-yellow) 0%,
                #ffed4e 25%,
                #fff176 50%,
                #ffed4e 75%,
                var(--primary-yellow) 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
            position: relative;
            display: inline-block;
            animation: highlight-glow 3s ease-in-out infinite alternate;
        }
        
        @keyframes highlight-glow {
            0% { 
                background-position: 0% 50%;
                filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
            }
            100% { 
                background-position: 100% 50%;
                filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.6));
            }
        }
        
        .hero-section h1 .highlight::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: -5px;
            right: -5px;
            height: 3px;
            background: linear-gradient(90deg, 
                transparent,
                var(--primary-yellow),
                var(--secondary-yellow),
                var(--primary-yellow),
                transparent);
            border-radius: 2px;
            opacity: 0.8;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
            animation: underline-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes underline-pulse {
            0% { 
                opacity: 0.6;
                transform: scaleX(0.95);
            }
            100% { 
                opacity: 1;
                transform: scaleX(1);
            }
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
            color: white;
            padding: 12px 28px;
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 40px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
            animation: badge-fade-in 1.2s ease-out 0.3s both;
        }
        
        @keyframes badge-fade-in {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-badge::before {
            content: '🏠';
            margin-right: 10px;
            font-size: 1.1em;
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
        }
        
        .hero-badge::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: badge-shimmer 3s ease-in-out infinite;
        }
        
        @keyframes badge-shimmer {
            0% { left: -100%; }
            50% { left: -100%; }
            100% { left: 100%; }
        }
        
        .hero-section .subtitle {
            font-size: 1.25rem;
            margin-bottom: 48px;
            color: rgba(255, 255, 255, 0.9);
            max-width: 750px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 400;
            line-height: 1.6;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            padding: 0 20px;
            animation: subtitle-fade-in 1.2s ease-out 0.6s both;
        }
        
        .hero-section .subtitle .emphasis {
            color: var(--secondary-yellow);
            font-weight: 600;
            text-shadow: 0 0 10px rgba(255, 237, 78, 0.5);
        }
        
        .exclusive-badge {
            animation: badge-bounce-in 1s ease-out 1.2s both;
        }
        
        @keyframes badge-bounce-in {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            60% {
                opacity: 1;
                transform: translateY(-5px) scale(1.02);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .hero-section .subtitle {
            font-size: 1.3rem;
            margin-bottom: 48px;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 400;
            line-height: 1.6;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            padding: 0 20px;
        }
        
        .hero-section .subtitle strong {
            color: var(--primary-yellow);
            font-weight: 600;
        }
        
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 0.95;
                transform: translateY(0);
            }
        }
        
        .exclusive-badge {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, 
                var(--primary-yellow) 0%, 
                var(--secondary-yellow) 50%,
                var(--primary-yellow) 100%);
            background-size: 200% 200%;
            color: var(--medium-black);
            padding: 18px 32px;
            border-radius: 35px;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            box-shadow: 
                0 12px 32px rgba(255, 215, 0, 0.35),
                0 6px 16px rgba(255, 215, 0, 0.25),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                inset 0 -2px 0 rgba(0, 0, 0, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.25);
            position: relative;
            overflow: hidden;
            animation: 
                badge-bounce-in 1.2s ease-out 1.4s both,
                badge-bg-flow 6s ease-in-out infinite;
        }
        
        @keyframes badge-bg-flow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .exclusive-badge::before {
            content: '⭐';
            font-size: 1.1em;
            animation: star-twinkle 2s ease-in-out infinite alternate;
        }
        
        @keyframes star-twinkle {
            0% { 
                transform: scale(1) rotate(0deg);
                filter: brightness(1);
            }
            100% { 
                transform: scale(1.1) rotate(5deg);
                filter: brightness(1.2);
            }
        }
        
        .exclusive-badge::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.4), 
                transparent);
            animation: badge-shine 4s ease-in-out infinite;
        }
        
        @keyframes badge-shine {
            0% { left: -100%; }
            20% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes badge-glow {
            from { 
                box-shadow: 
                    0 8px 24px rgba(255, 215, 0, 0.3),
                    0 4px 12px rgba(255, 215, 0, 0.2);
            }
            to { 
                box-shadow: 
                    0 12px 32px rgba(255, 215, 0, 0.4),
                    0 6px 16px rgba(255, 215, 0, 0.3);
            }
        }
        
        @keyframes badge-shimmer {
            0% { left: -100%; }
            50% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes fire-dance {
            0% { transform: rotate(-2deg) scale(1); }
            100% { transform: rotate(2deg) scale(1.05); }
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 100px;
            align-items: start;
        }
        
        .content-left {
            color: white;
        }
        
        .content-left h2 {
            font-size: 2.5rem;
            margin-bottom: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, var(--primary-yellow) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.02em;
        }
        
        .content-left p {
            font-size: 1.2rem;
            margin-bottom: 48px;
            opacity: 0.9;
            line-height: 1.8;
            font-weight: 400;
        }
        
        .benefits-list {
            list-style: none;
        }
        
        .benefits-list li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 32px;
            padding: 32px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 24px;
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-light);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        
        .benefits-list li::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
            opacity: 0;
            transition: all 0.4s ease;
        }
        
        .benefits-list li::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            transition: left 0.6s ease;
        }
        
        .benefits-list li:hover::before {
            opacity: 1;
        }
        
        .benefits-list li:hover::after {
            left: 100%;
        }
        
        .benefits-list li:hover {
            transform: translateY(-8px) translateX(4px);
            border-color: rgba(255, 215, 0, 0.4);
            box-shadow: 
                0 32px 64px rgba(0, 0, 0, 0.4),
                0 16px 32px rgba(255, 215, 0, 0.2);
            background: rgba(255, 255, 255, 0.08);
        }
        
        .check-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary-yellow) 0%, var(--secondary-yellow) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 24px;
            flex-shrink: 0;
            margin-top: 4px;
            box-shadow: 
                0 8px 24px rgba(255, 215, 0, 0.4),
                0 4px 12px rgba(255, 215, 0, 0.3);
            position: relative;
            z-index: 1;
            transition: all 0.3s ease;
        }
        
        .benefits-list li:hover .check-icon {
            transform: scale(1.1) rotate(360deg);
            box-shadow: 
                0 12px 32px rgba(255, 215, 0, 0.6),
                0 6px 16px rgba(255, 215, 0, 0.4);
        }
        
        .check-icon::after {
            content: '✓';
            color: var(--medium-black);
            font-weight: 900;
            font-size: 18px;
        }
        
        .benefit-content h3 {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #fff;
            transition: color 0.3s ease;
        }
        
        .benefits-list li:hover .benefit-content h3 {
            color: var(--primary-yellow);
        }
        
        .benefit-content p {
            font-size: 1.05rem;
            opacity: 0.8;
            margin: 0;
            line-height: 1.7;
            transition: opacity 0.3s ease;
        }
        
        .benefits-list li:hover .benefit-content p {
            opacity: 1;
        }
        
        .form-container {
            background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
            border-radius: 24px;
            padding: 48px;
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.15),
                0 10px 20px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 1);
            position: sticky;
            top: 40px;
            border: 1px solid rgba(255, 215, 0, 0.2);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .form-container:hover {
            transform: translateY(-4px);
            box-shadow: 
                0 32px 64px rgba(0, 0, 0, 0.2),
                0 16px 32px rgba(0, 0, 0, 0.15),
                0 0 40px rgba(255, 215, 0, 0.1);
            border-color: rgba(255, 215, 0, 0.3);
        }
        
        .form-header {
            text-align: center;
            margin-bottom: 56px;
            position: relative;
        }
        
        .form-header::before {
            content: '';
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            animation: header-glow 6s ease-in-out infinite alternate;
            z-index: -1;
        }
        
        @keyframes header-glow {
            0% { transform: translateX(-50%) scale(1); opacity: 0.3; }
            100% { transform: translateX(-50%) scale(1.2); opacity: 0.6; }
        }
        
        .lock-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary-yellow) 0%, var(--secondary-yellow) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            color: var(--medium-black);
            font-size: 32px;
            font-weight: 900;
            box-shadow: 
                0 8px 24px rgba(255, 215, 0, 0.3),
                0 4px 12px rgba(255, 215, 0, 0.2);
            position: relative;
            transition: all 0.3s ease;
        }
        
        .lock-icon:hover {
            transform: scale(1.05);
            box-shadow: 
                0 12px 32px rgba(255, 215, 0, 0.4),
                0 6px 16px rgba(255, 215, 0, 0.3);
        }
        
        .form-header h3 {
            font-size: 2rem;
            color: var(--medium-black);
            margin-bottom: 16px;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        
        .form-header p {
            color: #666;
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .form-step {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            margin-bottom: 0;
        }
        
        .form-step.active {
            opacity: 1;
            transform: translateY(0) scale(1);
            margin-bottom: 32px;
        }
        
        .form-group {
            position: relative;
            margin-bottom: 8px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 20px;
            font-weight: 800;
            color: var(--medium-black);
            font-size: 0.9rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            opacity: 0.7;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .form-group label::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary-yellow), var(--secondary-yellow));
            transition: width 0.4s ease;
        }
        
        .form-group:focus-within label::after {
            width: 40px;
        }
        
        .modern-input {
            width: 100%;
            padding: 20px 24px;
            border: 2px solid #e0e0e0;
            border-radius: 16px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            background: #fafafa;
            font-family: inherit;
            font-weight: 500;
            color: var(--medium-black);
        }
        
        .modern-input::placeholder {
            color: #999;
            font-weight: 400;
        }
        
        .modern-input:focus {
            outline: none;
            border-color: var(--primary-yellow);
            background: white;
            box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
            transform: translateY(-1px);
        }
        
        .modern-input.valid {
            border-color: #4ade80;
            background: #f0fdf4;
        }
        
        .input-wrapper {
            position: relative;
            margin-bottom: 32px;
        }
        
        .input-wrapper::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, 
                var(--primary-yellow) 0%, 
                transparent 25%, 
                transparent 75%, 
                var(--secondary-yellow) 100%);
            border-radius: 26px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
        }
        
        .input-wrapper:focus-within::before {
            opacity: 0.3;
            animation: input-border-glow 2s ease infinite;
        }
        
        @keyframes input-border-glow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
        }
        
        .input-icon {
            position: absolute;
            right: 28px;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: 900;
            opacity: 0;
            scale: 0;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
                0 8px 16px rgba(74, 222, 128, 0.4),
                0 4px 8px rgba(74, 222, 128, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.3);
            z-index: 2;
        }
        
        .input-icon::before {
            content: '';
            position: absolute;
            inset: -4px;
            background: linear-gradient(135deg, #4ade80, #22c55e);
            border-radius: 50%;
            opacity: 0.3;
            animation: success-pulse 2s ease infinite;
            z-index: -1;
        }
        
        @keyframes success-pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.1; }
        }
        
        .input-wrapper.validated .input-icon {
            opacity: 1;
            scale: 1;
            animation: success-pop 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes success-pop {
            0% { scale: 0; opacity: 0; }
            50% { scale: 1.3; opacity: 0.8; }
            100% { scale: 1; opacity: 1; }
        }
        
        .checkbox-group {
            display: flex;
            align-items: flex-start;
            margin-bottom: 40px;
            font-size: 0.95rem;
            color: #666;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .checkbox-group.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .custom-checkbox {
            position: relative;
            margin-right: 16px;
            margin-top: 2px;
        }
        
        .custom-checkbox input[type="checkbox"] {
            opacity: 0;
            position: absolute;
        }
        
        .checkmark {
            width: 24px;
            height: 24px;
            border: 3px solid #ddd;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            background: white;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
        }
        
        .custom-checkbox input[type="checkbox"]:checked + .checkmark {
            background: linear-gradient(135deg, var(--primary-yellow), var(--secondary-yellow));
            border-color: var(--primary-yellow);
            transform: scale(1.1);
            box-shadow: 
                0 4px 12px rgba(255, 215, 0, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.2);
        }
        
        .custom-checkbox input[type="checkbox"]:checked + .checkmark::after {
            content: '✓';
            color: var(--medium-black);
            font-size: 14px;
            font-weight: 900;
            animation: check-bounce 0.4s ease;
        }
        
        @keyframes check-bounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        
        .checkbox-group a {
            color: var(--primary-yellow);
            text-decoration: none;
            font-weight: 600;
            position: relative;
        }
        
        .checkbox-group a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-yellow);
            transition: width 0.3s ease;
        }
        
        .checkbox-group a:hover::after {
            width: 100%;
        }
        
        .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--primary-yellow) 0%, var(--secondary-yellow) 100%);
            color: var(--medium-black);
            border: none;
            padding: 20px 24px;
            border-radius: 16px;
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 
                0 8px 24px rgba(255, 215, 0, 0.3),
                0 4px 12px rgba(255, 215, 0, 0.2);
            position: relative;
            opacity: 0;
            transform: translateY(20px);
            font-family: inherit;
        }
        
        .submit-btn.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 12px 32px rgba(255, 215, 0, 0.4),
                0 6px 16px rgba(255, 215, 0, 0.3);
        }
        
        .submit-btn:active {
            transform: translateY(0);
        }
        
        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            background: linear-gradient(135deg, #ccc, #999);
        }
        
        .progress-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            margin-bottom: 40px;
            position: relative;
        }
        
        .progress-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #e0e0e0;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .progress-dot.active {
            background: linear-gradient(135deg, var(--primary-yellow), var(--secondary-yellow));
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
        
        .progress-dot.completed {
            background: linear-gradient(135deg, #4ade80, #22c55e);
            transform: scale(1.1);
        }
        
        .privacy-note {
            text-align: center;
            margin-top: 32px;
            font-size: 0.9rem;
            color: #888;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .privacy-note.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .privacy-note a {
            color: var(--primary-yellow);
            text-decoration: none;
            font-weight: 600;
        }
        
        .security-badges {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 32px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .security-badges.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .security-badge {
            display: flex;
            align-items: center;
            font-size: 0.85rem;
            color: #999;
            padding: 12px 16px;
            background: rgba(0, 0, 0, 0.03);
            border-radius: 25px;
            border: 2px solid rgba(0, 0, 0, 0.06);
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .security-badge:hover {
            background: rgba(255, 215, 0, 0.05);
            border-color: rgba(255, 215, 0, 0.2);
            color: #666;
        }
        
        .security-badge::before {
            content: '🔒';
            margin-right: 8px;
            font-size: 1em;
        }
        
        .social-proof {
            text-align: center;
            margin-top: 48px;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 32px;
            color: white;
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-light);
            transition: all 0.4s ease;
        }
        
        .social-proof:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 215, 0, 0.3);
            transform: translateY(-4px);
        }
        
        .social-proof .stat {
            font-size: 3.5rem;
            font-weight: 900;
            background: linear-gradient(135deg, var(--primary-yellow) 0%, var(--secondary-yellow) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
            animation: stat-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes stat-glow {
            from { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
            to { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)); }
        }
        
        .social-proof p {
            font-size: 1.2rem;
            opacity: 0.9;
            font-weight: 600;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
                gap: 80px;
            }
            
            .form-container {
                padding: 40px 32px;
                transform: none;
            }
            
            .container {
                padding: 60px 20px;
            }
            
            .hero-section {
                margin-bottom: 80px;
                padding: 40px 0;
            }
            
            .hero-section h1 {
                font-size: clamp(2rem, 7vw, 3rem);
                padding: 0 15px;
                line-height: 1.2;
                margin-bottom: 32px;
                letter-spacing: -0.02em;
            }
            
            .hero-section h1::before {
                width: 60px;
                height: 3px;
                top: -12px;
            }
            
            .hero-section .subtitle {
                font-size: 1.1rem;
                padding: 0 15px;
                line-height: 1.5;
                margin-bottom: 40px;
            }
            
            .hero-badge {
                font-size: 0.75rem;
                padding: 10px 20px;
                margin-bottom: 28px;
                letter-spacing: 1px;
            }
            
            .exclusive-badge {
                font-size: 0.8rem;
                padding: 14px 24px;
                letter-spacing: 1px;
            }
            
            .lock-icon {
                width: 60px;
                height: 60px;
                font-size: 24px;
            }
            
            .floating-element {
                display: none;
            }
        }
        
        @media (max-width: 480px) {
            .hero-section h1 {
                font-size: clamp(1.7rem, 8vw, 2.4rem);
                padding: 0 10px;
            }
            
            .hero-section .subtitle {
                font-size: 1rem;
                padding: 0 10px;
            }
            
            .hero-badge {
                font-size: 0.7rem;
                padding: 8px 16px;
            }
            
            .exclusive-badge {
                font-size: 0.75rem;
                padding: 12px 20px;
            }
        }
        
        .loading-spinner {
            width: 24px;
            height: 24px;
            border: 3px solid rgba(26, 26, 26, 0.3);
            border-top: 3px solid var(--medium-black);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-left: 12px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Professional Animations for Home Service Company */
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 0.95;
                transform: translateY(0);
            }
        }
        
        @keyframes success-pop {
            0% { scale: 0; opacity: 0; }
            50% { scale: 1.1; opacity: 0.8; }
            100% { scale: 1; opacity: 1; }
        }
        
        /* Advanced Success State */
        .success-container {
            text-align: center;
            padding: 60px 0;
            animation: success-fade-in 0.8s ease-out;
        }
        
        @keyframes success-fade-in {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .success-icon {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #4ade80, #22c55e);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 32px;
            font-size: 60px;
            color: white;
            box-shadow: 
                0 24px 48px rgba(74, 222, 128, 0.4),
                0 12px 24px rgba(74, 222, 128, 0.3);
            animation: success-bounce 1s ease-out;
        }
        
        @keyframes success-bounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .success-title {
            color: var(--medium-black);
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #4ade80, #22c55e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .success-message {
            color: #666;
            font-size: 1.2rem;
            margin-bottom: 32px;
            font-weight: 500;
        }
        
        .success-note {
            font-size: 1rem;
            color: #888;
            font-weight: 400;
        }
    </style>
</head>
<body>
    <div class="background-effects">
        <div class="gradient-orb"></div>
        <div class="gradient-orb"></div>
        <div class="gradient-orb"></div>
        <div class="floating-particles" id="particles"></div>
    </div>
    
    <div class="dev-notice">
        Development Mode: You can navigate freely using the navigation above, or fill out the form below to unlock content.
    </div>
    
    <div class="container">
        <div class="hero-section">
            <div class="floating-element"></div>
            <div class="floating-element"></div>
            <div class="floating-element"></div>
            <div class="hero-badge">Columbus Homeowner Protection Guide</div>
            <h1>Don't Get Burned by <span class="highlight">Bad Waterproofing Contractors</span>:<br>Get the 12 Questions That <span class="highlight">Expose Red Flags</span></h1>
            <p class="subtitle">Columbus homeowners use these <span class="emphasis">insider questions</span> to avoid costly mistakes, shoddy work, and contractors who <span class="emphasis">disappear after taking your money</span>.</p>
            <div class="exclusive-badge">Exclusive Access - Limited Time Resource</div>
        </div>
        
        <div class="main-content">
            <div class="content-left">
                <h2>Why This Matters For Your Home</h2>
                <p>Hiring a basement waterproofing contractor can feel overwhelming. Without the right questions, you risk overpaying, shoddy workmanship, and even costly repairs down the line. Our exclusive script levels the playing field, empowering you with the exact insights professionals use to ensure your home's long-term protection.</p>
                
                <h2>What's Inside</h2>
                <ul class="benefits-list">
                    <li>
                        <div class="check-icon"></div>
                        <div class="benefit-content">
                            <h3>Expose Hidden Contractor Red Flags</h3>
                            <p>Instantly identify unreliable contractors before you hire them, saving you countless headaches and wasted money.</p>
                        </div>
                    </li>
                    <li>
                        <div class="check-icon"></div>
                        <div class="benefit-content">
                            <h3>Slash Unexpected Costs & Delays</h3>
                            <p>Prevent surprise charges, unfinished work, and costly code violations by asking the right questions upfront.</p>
                        </div>
                    </li>
                    <li>
                        <div class="check-icon"></div>
                        <div class="benefit-content">
                            <h3>Comprehensive for Any Basement</h3>
                            <p>Whether your basement is finished or unfinished, these questions are universally applicable to secure expert waterproofing.</p>
                        </div>
                    </li>
                    <li>
                        <div class="check-icon"></div>
                        <div class="benefit-content">
                            <h3>Gain Absolute Peace of Mind</h3>
                            <p>Confidently select a reliable contractor knowing you've asked every crucial question to ensure a successful, lasting job.</p>
                        </div>
                    </li>
                </ul>
                
                <div class="social-proof">
                    <div class="stat">1,247+</div>
                    <p>Columbus homeowners have already used this script to find trusted waterproofing contractors</p>
                </div>
            </div>
            
            <div class="form-container">
                <div class="form-header">
                    <div class="lock-icon">🔓</div>
                    <h3>Get Instant Access</h3>
                    <p>Download the complete 12-question contractor vetting script</p>
                </div>
                
                <div class="progress-dots">
                    <div class="progress-dot active" data-step="1"></div>
                    <div class="progress-dot" data-step="2"></div>
                    <div class="progress-dot" data-step="3"></div>
                </div>
                
                <form id="progressiveForm">
                    <!-- Step 1: Email -->
                    <div class="form-step active" data-step="1">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <div class="input-wrapper">
                                <input type="email" id="email" name="email" class="modern-input" 
                                       placeholder="Enter your email address" required>
                                <div class="input-icon">✓</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step 2: Name -->
                    <div class="form-step" data-step="2">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <div class="input-wrapper">
                                <input type="text" id="firstName" name="firstName" class="modern-input" 
                                       placeholder="Enter your first name" required>
                                <div class="input-icon">✓</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step 3: Consent -->
                    <div class="checkbox-group" data-step="3">
                        <div class="custom-checkbox">
                            <input type="checkbox" id="terms" name="terms" required>
                            <div class="checkmark"></div>
                        </div>
                        <label for="terms">I accept the <a href="#" target="_blank">terms and conditions</a> and <a href="#" target="_blank">privacy policy</a></label>
                    </div>
                    
                    <button type="submit" class="submit-btn" id="submitBtn">
                        <span class="btn-text">Get My Free 12-Question Script Now!</span>
                    </button>
                </form>
                
                <div class="privacy-note">
                    🔒 Your information is 100% secure. We will never share your email. <a href="#">Privacy Policy</a>
                </div>
                
                <div class="security-badges">
                    <div class="security-badge">
                        <span class="badge-icon">🔒</span>
                        SSL Secured
                    </div>
                    <div class="security-badge">
                        <span class="badge-icon">🚫</span>
                        Spam Free
                    </div>
                    <div class="security-badge">
                        <span class="badge-icon">🛡️</span>
                        GDPR Compliant
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Floating Particles System
        class ParticleSystem {
            constructor() {
                this.container = document.getElementById('particles');
                this.particles = [];
                this.init();
            }
            
            init() {
                this.createParticles();
                setInterval(() => this.createParticle(), 2000);
            }
            
            createParticles() {
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => this.createParticle(), i * 200);
                }
            }
            
            createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                this.container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 15000);
            }
        }
        
        // Enhanced Progressive Form
        class EnhancedProgressiveForm {
            constructor() {
                this.currentStep = 1;
                this.maxStep = 3;
                this.form = document.getElementById('progressiveForm');
                this.emailInput = document.getElementById('email');
                this.nameInput = document.getElementById('firstName');
                this.termsCheckbox = document.getElementById('terms');
                this.submitBtn = document.getElementById('submitBtn');
                this.progressLine = document.querySelector('.progress-dots');
                
                this.init();
            }
            
            init() {
                this.emailInput.addEventListener('input', this.handleEmailInput.bind(this));
                this.nameInput.addEventListener('input', this.handleNameInput.bind(this));
                this.termsCheckbox.addEventListener('change', this.handleTermsChange.bind(this));
                this.form.addEventListener('submit', this.handleSubmit.bind(this));
                
                // Add advanced input effects
                this.addInputEffects();
                this.addProgressInteractivity();
                
                // Show initial elements with enhanced animation
                setTimeout(() => {
                    this.showElementsForStep(1);
                }, 1000);
            }
            
            addInputEffects() {
                [this.emailInput, this.nameInput].forEach(input => {
                    input.addEventListener('focus', (e) => {
                        e.target.style.transform = 'translateY(-1px)';
                    });
                    
                    input.addEventListener('blur', (e) => {
                        if (!e.target.matches(':focus')) {
                            e.target.style.transform = '';
                        }
                    });
                });
            }
            
            addProgressInteractivity() {
                // Make progress dots interactive
                document.querySelectorAll('.progress-dot').forEach((dot, index) => {
                    dot.addEventListener('mouseenter', () => {
                        if (index + 1 <= this.currentStep) {
                            dot.style.transform = 'scale(1.6)';
                            dot.style.zIndex = '10';
                        }
                    });
                    
                    dot.addEventListener('mouseleave', () => {
                        const isActive = dot.classList.contains('active');
                        const isCompleted = dot.classList.contains('completed');
                        if (isActive) {
                            dot.style.transform = 'scale(1.4)';
                        } else if (isCompleted) {
                            dot.style.transform = 'scale(1.2)';
                        } else {
                            dot.style.transform = 'scale(1)';
                        }
                        dot.style.zIndex = '1';
                    });
                });
            }
            
            handleEmailInput(e) {
                const email = e.target.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValid = emailRegex.test(email);
                
                if (isValid) {
                    this.markInputAsValid(e.target);
                    if (this.currentStep === 1) {
                        setTimeout(() => {
                            this.nextStep();
                        }, 1200);
                    }
                } else {
                    this.markInputAsInvalid(e.target);
                }
            }
            
            handleNameInput(e) {
                const name = e.target.value.trim();
                const isValid = name.length >= 2;
                
                if (isValid) {
                    this.markInputAsValid(e.target);
                    if (this.currentStep === 2) {
                        setTimeout(() => {
                            this.nextStep();
                        }, 1200);
                    }
                } else {
                    this.markInputAsInvalid(e.target);
                }
            }
            
            handleTermsChange(e) {
                if (e.target.checked && this.currentStep === 3) {
                    setTimeout(() => {
                        this.showSubmitButton();
                    }, 500);
                }
            }
            
            markInputAsValid(input) {
                input.classList.add('valid');
                input.parentElement.classList.add('validated');
                
                // Enhanced success animation
                setTimeout(() => {
                    input.style.transform = 'translateY(-3px) scale(1.02)';
                    input.style.animation = 'success-bounce 0.6s ease';
                    setTimeout(() => {
                        input.style.transform = '';
                        input.style.animation = '';
                    }, 600);
                }, 200);
            }
            
            markInputAsInvalid(input) {
                input.classList.remove('valid');
                input.parentElement.classList.remove('validated');
            }
            
            nextStep() {
                if (this.currentStep < this.maxStep) {
                    // Mark current step as completed
                    const currentDot = document.querySelector(`[data-step="${this.currentStep}"]`);
                    currentDot.classList.add('completed');
                    currentDot.classList.remove('active');
                    
                    this.currentStep++;
                    this.updateProgressDots();
                    this.showElementsForStep(this.currentStep);
                }
            }
            
            updateProgressDots() {
                // Update progress line
                const progressPercentage = ((this.currentStep - 1) / (this.maxStep - 1)) * 100;
                this.progressLine.style.setProperty('--progress', `${progressPercentage}%`);
                
                document.querySelectorAll('.progress-dot').forEach((dot, index) => {
                    if (index + 1 < this.currentStep) {
                        dot.classList.add('completed');
                        dot.classList.remove('active');
                    } else if (index + 1 === this.currentStep) {
                        dot.classList.add('active');
                        dot.classList.remove('completed');
                    } else {
                        dot.classList.remove('active', 'completed');
                    }
                });
            }
            
            showElementsForStep(step) {
                // Show form step with enhanced animation
                const stepElement = document.querySelector(`[data-step="${step}"].form-step`);
                if (stepElement) {
                    stepElement.classList.add('active');
                    
                    // Enhanced focus with delay and effect
                    setTimeout(() => {
                        const input = stepElement.querySelector('input');
                        if (input) {
                            input.focus();
                            input.style.transform = 'translateY(-3px) scale(1.02)';
                            input.style.animation = 'input-appear 0.6s ease';
                            setTimeout(() => {
                                input.style.transform = '';
                                input.style.animation = '';
                            }, 600);
                        }
                    }, 400);
                }
                
                // Show additional elements for step 3 with staggered animation
                if (step === 3) {
                    setTimeout(() => {
                        document.querySelector('.checkbox-group').classList.add('show');
                    }, 500);
                    
                    setTimeout(() => {
                        document.querySelector('.privacy-note').classList.add('show');
                    }, 800);
                    
                    setTimeout(() => {
                        document.querySelector('.security-badges').classList.add('show');
                    }, 1100);
                }
            }
            
            showSubmitButton() {
                this.submitBtn.classList.add('show');
                
                // Enhanced entrance animation
                setTimeout(() => {
                    this.submitBtn.style.animation = 'btn-entrance 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 200);
            }
            
            async handleSubmit(e) {
                e.preventDefault();
                
                // Enhanced validation
                const email = this.emailInput.value;
                const name = this.nameInput.value;
                const terms = this.termsCheckbox.checked;
                
                if (!email || !name || !terms) {
                    this.showError('Please complete all fields and accept the terms.');
                    return;
                }
                
                // Show enhanced loading state
                this.setLoadingState(true);
                
                // Simulate API call with realistic timing
                try {
                    await this.simulateFormSubmission({ email, name, terms });
                    this.showSuccess();
                } catch (error) {
                    this.showError('Something went wrong. Please try again.');
                } finally {
                    this.setLoadingState(false);
                }
            }
            
            setLoadingState(loading) {
                if (loading) {
                    this.submitBtn.disabled = true;
                    this.submitBtn.innerHTML = `
                        <span class="btn-text">Processing Your Request...</span>
                        <div class="loading-spinner"></div>
                    `;
                    this.submitBtn.style.animation = 'none';
                    this.submitBtn.style.transform = 'translateY(-2px) scale(0.98)';
                } else {
                    this.submitBtn.disabled = false;
                    this.submitBtn.innerHTML = '<span class="btn-text">Get My Free 12-Question Script Now!</span>';
                    this.submitBtn.style.transform = '';
                }
            }
            
            async simulateFormSubmission(data) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log('Form submitted with enhanced data:', data);
                        resolve();
                    }, 3000);
                });
            }
            
            showSuccess() {
                // Enhanced success animation
                this.form.innerHTML = `
                    <div class="success-container">
                        <div class="success-icon">✓</div>
                        <h3 class="success-title">Perfect! You're All Set!</h3>
                        <p class="success-message">Your exclusive 12-question contractor vetting script is on its way to your inbox.</p>
                        <p class="success-note">Check your email (including spam folder) within the next 2 minutes.</p>
                    </div>
                `;
                
                // Hide all form elements with staggered animation
                setTimeout(() => {
                    document.querySelector('.progress-dots').style.opacity = '0';
                    document.querySelector('.progress-dots').style.transform = 'translateY(-20px)';
                }, 100);
                
                setTimeout(() => {
                    document.querySelector('.privacy-note').style.opacity = '0';
                    document.querySelector('.security-badges').style.opacity = '0';
                }, 300);
            }
            
            showError(message) {
                // Enhanced error notification with better styling
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = `
                    position: fixed;
                    top: 30px;
                    right: 30px;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    padding: 20px 28px;
                    border-radius: 16px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    box-shadow: 
                        0 20px 40px rgba(239, 68, 68, 0.4),
                        0 10px 20px rgba(239, 68, 68, 0.3);
                    z-index: 10000;
                    animation: error-slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                `;
                errorDiv.textContent = `⚠️ ${message}`;
                document.body.appendChild(errorDiv);
                
                // Enhanced removal with animation
                setTimeout(() => {
                    errorDiv.style.animation = 'error-slide-out 0.4s ease forwards';
                    setTimeout(() => {
                        errorDiv.remove();
                    }, 400);
                }, 4000);
            }
        }
        
        // Enhanced Scroll Animations
        class ScrollAnimations {
            constructor() {
                this.init();
            }
            
            init() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0) scale(1)';
                            }, index * 150);
                        }
                    });
                }, observerOptions);
                
                document.querySelectorAll('.benefits-list li').forEach((li, index) => {
                    li.style.opacity = '0';
                    li.style.transform = 'translateY(40px) scale(0.95)';
                    li.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    observer.observe(li);
                });
            }
        }
        
        // Initialize all systems
        document.addEventListener('DOMContentLoaded', () => {
            new ParticleSystem();
            new EnhancedProgressiveForm();
            new ScrollAnimations();
        });
    </script>
</body>
</html>
