import { useImmer } from '@/hooks/useImmer';
import { todoCountAtom } from '@/states';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
  age: number;
  skills: string[];
}

const ObjectStateTest = () => {
  //复杂的逻辑
  const [count, setCount] = useAtom(todoCountAtom);
  useEffect(() => {
    console.log('🍊我被渲染了');
  }, []);
  //   const [userInfo, setUserInfo] = useState<UserInfo>({
  //     name: 'John',
  //     age: 25,
  //     skills: ['React', 'TypeScript'],
  //   });

  const [userInfo, setUserInfo] = useImmer<UserInfo>({
    name: 'John',
    age: 25,
    skills: ['React', 'TypeScript'],
  });
  // 错误的更新方式 - 直接修改同一个对象
  const handleWrongUpdate = () => {
    setUserInfo({ name: 'John', age: 25, skills: ['React', 'TypeScript'] });
  };

  // 正确的更新方式 - 创建新对象
  const handleCorrectUpdate = () => {
    setUserInfo(userInfo => {
      userInfo.name = 'ZHIJIA';
      userInfo.age = 25;
      //数组搞不定
      userInfo.skills = ['React', 'TypeScript'];
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">用户信息</h2>
        <p>姓名: {userInfo.name}</p>
        <p>年龄: {userInfo.age}</p>
        <p>技能: {userInfo.skills.join(', ')}</p>
      </div>

      <div className="space-x-4">
        <button
          onClick={handleWrongUpdate}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-300 cursor-pointer"
        >
          错误更新（不会重新渲染）
        </button>

        <button
          onClick={handleCorrectUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          正确更新
        </button>
      </div>
    </div>
  );
};
ObjectStateTest.whyDidYouRender = true;
export default ObjectStateTest;
