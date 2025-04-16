import React, { useState } from 'react';

function Login() {
  // 입력 폼 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 서버에서 받은 토큰과 에러 메시지 상태
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 백엔드에 POST 요청 (예: http://localhost:8080/auth/token)
      const response = await fetch('http://localhost:8080/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // email과 password를 JSON 형식으로 전송
        body: JSON.stringify({ email, password }),
      });

      // HTTP 상태 코드가 200번대가 아니면 에러 처리
      if (!response.ok) {
        throw new Error('인증에 실패했습니다. 다시 시도해주세요.');
      }

      // 응답 JSON에서 토큰 추출
      const data = await response.json();
      setToken(data.token);
      setError(null);
    } catch (err) {
      setError(err.message);
      setToken(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이메일: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>비밀번호: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">로그인</button>
        </div>
      </form>

      {token && (
        <div style={{ marginTop: '2rem' }}>
          <h3>발급된 JWT 토큰:</h3>
          <textarea readOnly value={token} rows="5" style={{ width: '80%' }} />
        </div>
      )}

      {error && (
        <div style={{ marginTop: '2rem', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
