const Sidebar = () => {
  return (
    <aside className="fixed flex h-screen w-[16.6875rem] flex-col items-center justify-between border-r py-4">
      <div className="border-b border-gray-300"></div>
      <div>기업자명</div>
      <div className="border-b border-gray-300"></div>
      <div>
        <ul>
          <li>대시보드</li>
          <li>지원자 리스트</li>
          <li>계정 연동</li>
        </ul>
      </div>
      <div className="border-b border-gray-300"></div>
      <div>설정</div>
    </aside>
  );
};

export default Sidebar;
