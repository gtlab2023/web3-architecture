/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface BankSolInterface extends utils.Interface {
  functions: {
    "ANNUAL_INTEREST_RATE()": FunctionFragment;
    "MAX_WITHDRAWAL_PERCENTAGE()": FunctionFragment;
    "SECONDS_PER_YEAR()": FunctionFragment;
    "deposits(address)": FunctionFragment;
    "deposit()": FunctionFragment;
    "calculateInterest(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
    "getContractBalance()": FunctionFragment;
    "getTotalBalance(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ANNUAL_INTEREST_RATE"
      | "MAX_WITHDRAWAL_PERCENTAGE"
      | "SECONDS_PER_YEAR"
      | "deposits"
      | "deposit"
      | "calculateInterest"
      | "withdraw"
      | "withdrawAll"
      | "getContractBalance"
      | "getTotalBalance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ANNUAL_INTEREST_RATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_WITHDRAWAL_PERCENTAGE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SECONDS_PER_YEAR",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "deposits", values: [string]): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "calculateInterest",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalBalance",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "ANNUAL_INTEREST_RATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_WITHDRAWAL_PERCENTAGE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_PER_YEAR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateInterest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalBalance",
    data: BytesLike
  ): Result;

  events: {
    "Deposit(address,uint256)": EventFragment;
    "InterestCalculated(address,uint256)": EventFragment;
    "Withdrawal(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InterestCalculated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}

export interface DepositEventObject {
  user: string;
  amount: BigNumber;
}
export type DepositEvent = TypedEvent<[string, BigNumber], DepositEventObject>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface InterestCalculatedEventObject {
  user: string;
  interest: BigNumber;
}
export type InterestCalculatedEvent = TypedEvent<
  [string, BigNumber],
  InterestCalculatedEventObject
>;

export type InterestCalculatedEventFilter =
  TypedEventFilter<InterestCalculatedEvent>;

export interface WithdrawalEventObject {
  user: string;
  amount: BigNumber;
  interest: BigNumber;
}
export type WithdrawalEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  WithdrawalEventObject
>;

export type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;

export interface BankSol extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BankSolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ANNUAL_INTEREST_RATE(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_WITHDRAWAL_PERCENTAGE(overrides?: CallOverrides): Promise<[BigNumber]>;

    SECONDS_PER_YEAR(overrides?: CallOverrides): Promise<[BigNumber]>;

    deposits(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        timestamp: BigNumber;
        lastInterestCalculation: BigNumber;
      }
    >;

    /**
     * 存入ETH并开始计算利息
     */
    deposit(
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * 计算用户应得的利息
     * @param user 用户地址
     */
    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    /**
     * 提取指定数量的ETH和对应的利息
     * @param amount 要提取的金额
     */
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * 提取所有存款和利息
     * 为防止挤兑，该功能已禁用
     */
    withdrawAll(overrides?: CallOverrides): Promise<[void]>;

    /**
     * 查询合约的总余额
     */
    getContractBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * 查询用户的总余额（包含利息）
     * @param user 要查询的用户地址
     */
    getTotalBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  ANNUAL_INTEREST_RATE(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_WITHDRAWAL_PERCENTAGE(overrides?: CallOverrides): Promise<BigNumber>;

  SECONDS_PER_YEAR(overrides?: CallOverrides): Promise<BigNumber>;

  deposits(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      amount: BigNumber;
      timestamp: BigNumber;
      lastInterestCalculation: BigNumber;
    }
  >;

  /**
   * 存入ETH并开始计算利息
   */
  deposit(
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * 计算用户应得的利息
   * @param user 用户地址
   */
  calculateInterest(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * 提取指定数量的ETH和对应的利息
   * @param amount 要提取的金额
   */
  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * 提取所有存款和利息
   * 为防止挤兑，该功能已禁用
   */
  withdrawAll(overrides?: CallOverrides): Promise<void>;

  /**
   * 查询合约的总余额
   */
  getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * 查询用户的总余额（包含利息）
   * @param user 要查询的用户地址
   */
  getTotalBalance(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    ANNUAL_INTEREST_RATE(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_WITHDRAWAL_PERCENTAGE(overrides?: CallOverrides): Promise<BigNumber>;

    SECONDS_PER_YEAR(overrides?: CallOverrides): Promise<BigNumber>;

    deposits(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        timestamp: BigNumber;
        lastInterestCalculation: BigNumber;
      }
    >;

    /**
     * 存入ETH并开始计算利息
     */
    deposit(overrides?: CallOverrides): Promise<void>;

    /**
     * 计算用户应得的利息
     * @param user 用户地址
     */
    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * 提取指定数量的ETH和对应的利息
     * @param amount 要提取的金额
     */
    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    /**
     * 提取所有存款和利息
     * 为防止挤兑，该功能已禁用
     */
    withdrawAll(overrides?: CallOverrides): Promise<void>;

    /**
     * 查询合约的总余额
     */
    getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * 查询用户的总余额（包含利息）
     * @param user 要查询的用户地址
     */
    getTotalBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "Deposit(address,uint256)"(
      user?: string | null,
      amount?: null
    ): DepositEventFilter;
    Deposit(user?: string | null, amount?: null): DepositEventFilter;

    "InterestCalculated(address,uint256)"(
      user?: string | null,
      interest?: null
    ): InterestCalculatedEventFilter;
    InterestCalculated(
      user?: string | null,
      interest?: null
    ): InterestCalculatedEventFilter;

    "Withdrawal(address,uint256,uint256)"(
      user?: string | null,
      amount?: null,
      interest?: null
    ): WithdrawalEventFilter;
    Withdrawal(
      user?: string | null,
      amount?: null,
      interest?: null
    ): WithdrawalEventFilter;
  };

  estimateGas: {
    ANNUAL_INTEREST_RATE(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_WITHDRAWAL_PERCENTAGE(overrides?: CallOverrides): Promise<BigNumber>;

    SECONDS_PER_YEAR(overrides?: CallOverrides): Promise<BigNumber>;

    deposits(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * 存入ETH并开始计算利息
     */
    deposit(
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * 计算用户应得的利息
     * @param user 用户地址
     */
    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * 提取指定数量的ETH和对应的利息
     * @param amount 要提取的金额
     */
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * 提取所有存款和利息
     * 为防止挤兑，该功能已禁用
     */
    withdrawAll(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * 查询合约的总余额
     */
    getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * 查询用户的总余额（包含利息）
     * @param user 要查询的用户地址
     */
    getTotalBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ANNUAL_INTEREST_RATE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MAX_WITHDRAWAL_PERCENTAGE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SECONDS_PER_YEAR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposits(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * 存入ETH并开始计算利息
     */
    deposit(
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * 计算用户应得的利息
     * @param user 用户地址
     */
    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * 提取指定数量的ETH和对应的利息
     * @param amount 要提取的金额
     */
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * 提取所有存款和利息
     * 为防止挤兑，该功能已禁用
     */
    withdrawAll(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * 查询合约的总余额
     */
    getContractBalance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * 查询用户的总余额（包含利息）
     * @param user 要查询的用户地址
     */
    getTotalBalance(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
