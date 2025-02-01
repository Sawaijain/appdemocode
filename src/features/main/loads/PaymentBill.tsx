import BaseScreen from '@/features/base/screens/BaseScreen';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {getDispatchCalc, getDispatchDetails} from '@/redux/actions/LoadAction';
import strings from '@/util/Strings';
import * as React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import DetailHeader from '../payment/components/DetailHeader';
import PaymentInfo from './components/PaymentInfo';
import BillAdvanceBalanceCard from './components/BillAdvanceBalanceCard';
import {calculateAmount} from '@/libs';
import {CommisionTableData} from '@/libs/Utils';
interface PaymentBillProps {}

const PaymentBill: any = (props: PaymentBillProps) => {
  var {
    route: {
      params: {orderId},
    },
    calculationData,
    loadDetails,
  }: any = props;
  React.useEffect(() => {
    if (orderId) {
      getCalculation();
    }
  }, [orderId]);
  const getCalculation = async () => {
    getDispatchCalc(orderId);
    getDispatchDetails(orderId);
  };
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const [calculation, setCalculation] = React.useState<any>(null);
  React.useEffect(() => {
    if (calculationData && loadDetails) {
      let _weight = calculationData?.weightActual || calculationData?.weight;
      let _finalRate =
        calculationData?.carrierFinalRate || calculationData?.finalRate;
      let _totalFreight = Number(_finalRate) * Number(_weight);
      let _tax = userDetails?.truck_count_type == '1-9 trucks' ? 0 : 1;
      let _taxAmount = calculateAmount(Number(_totalFreight), Number(_tax));
      let _actualFreight = Number(_totalFreight) - Number(_tax);
      let _advancePercentage = calculationData?.advancePercentage || 70;
      let _origin = loadDetails?.origin?.split(',');
      let _destination = loadDetails?.destination?.split(',');
      let _agCommission = 0;
      let finalDt: any = CommisionTableData.find(
        (ele) => _weight >= ele.minWeight && _weight < ele.maxWeigth,
      );
      console.log('_origin[_origin?.length - 2]', _origin[_origin?.length - 2]);
      console.log(
        '_destination[_destination?.length - 2]',
        _destination[_destination?.length - 2],
      );
      console.log('_weight', _weight);
      console.log('finalDt', finalDt);
      if (
        _origin[_origin?.length - 2]?.toLowerCase() ==
        _destination[_destination?.length - 2]?.toLowerCase()
      ) {
        _agCommission = finalDt?.localRate;
      } else {
        _agCommission = finalDt?.outerRate;
      }
      let _payableBalance =
        _actualFreight -
        calculateAmount(Number(_actualFreight), Number(_advancePercentage)) -
        Number(loadDetails?.isFoSettingSave ? calculationData?.deduction : 0) +
        Number(loadDetails?.isFoSettingSave ? calculationData?.detention : 0);
      let _calculation = {
        foTotalFreight: _totalFreight,
        actualFreight: _actualFreight,
        taxAmount: _taxAmount,
        advancePercentage: _advancePercentage,
        advanceAmount: calculateAmount(
          Number(_actualFreight),
          Number(_advancePercentage),
        ),
        agCommission: _agCommission,
        cashback: loadDetails?.isFoSettingSave ? calculationData?.cash : 0,
        payableAdvance:
          calculateAmount(Number(_actualFreight), Number(_advancePercentage)) -
          Number(_agCommission),
        deduction: loadDetails?.isFoSettingSave
          ? calculationData?.deduction
          : 0,
        detention: loadDetails?.isFoSettingSave
          ? calculationData?.detention
          : 0,
        balancePayable: _payableBalance,
      };
      setCalculation(_calculation);
    }
  }, [calculationData, loadDetails]);
  return (
    <TruckBaseScreen
      profileType={userDetails?.profileType}
      scrollChildren={
        <React.Fragment>
          <DetailHeader
            title={strings.receipt}
            data={{orderId}}
            onRefresh={() => getCalculation()}
          />
          <PaymentInfo
            data={[
              {
                [strings.payBill.totalFreight]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.foTotalFreight || 0) -
                        Math.round(calculationData?.shipperAgentAmount || 0),
                    )
                  : NumberSeparatorInstance.numberSeparator(
                      calculation?.foTotalFreight,
                    ),
              },
              {
                [strings.payBill.tax]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.foTdsAmount || 0),
                    )
                  : NumberSeparatorInstance.numberSeparator(
                      calculation?.taxAmount,
                    ),
              },
              {
                [strings.payBill.asalBhada]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.foActualTotalFreight || 0) -
                        Math.round(calculationData?.shipperAgentAmount || 0),
                    )
                  : NumberSeparatorInstance.numberSeparator(
                      calculation?.actualFreight,
                    ),
              },
              {
                [strings.payBill.agFee]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.ag_Commision),
                    )
                  : NumberSeparatorInstance.numberSeparator(
                      calculation?.agCommission,
                    ),
              },
              {
                [strings.advancePay]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.foPayments[0]?.amount),
                    )
                  : NumberSeparatorInstance.numberSeparator(
                      calculation?.payableAdvance,
                    ),
              },
              {
                ['कैश']: NumberSeparatorInstance.numberSeparator(
                  Math.round(calculationData?.cash),
                ),
              },
              {
                [strings.payBill.halting]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.detentionAmount),
                    )
                  : 0,
              },
              {
                [strings.payBill.shortage]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.deduction),
                    )
                  : '0',
              },
              {
                [strings.dueComplete]: loadDetails?.isFoSettingSave
                  ? NumberSeparatorInstance.numberSeparator(
                      Math.round(calculationData?.foBalancePending),
                    )
                  : NumberSeparatorInstance.numberSeparator(
                      calculation?.balancePayable,
                    ),
              },
            ]}
          />
          <BillAdvanceBalanceCard
            title={strings.advancePay}
            data={{
              amount: calculationData?.foPayments[0]?.amount,
              transactionId: calculationData?.foPayments[0]?._id,
              history: calculationData?.foPayments[0]?.transactionHistory,
            }}
          />
          <BillAdvanceBalanceCard
            title={strings.dueComplete}
            data={{
              amount: calculationData?.foPayments[1]?.amount,
              transactionId: calculationData?.foPayments[1]?._id,
              history: calculationData?.foPayments[1]?.transactionHistory,
            }}
          />
        </React.Fragment>
      }
    />
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.userDetails,
    userId: state.auth.userDetails.user_id,
    calculationData: state.load.calculationData,
    loadDetails: state.load.dispatchDetails,
  };
};
PaymentBill.SCREEN_NAME = 'PaymentBill';
PaymentBill.navigationOptions = {
  headerShown: false,
};
PaymentBill.navigate = () => {
  RootNavigator.navigate(PaymentBill.SCREEN_NAME);
};
export default connect(mapStateToProps, null)(PaymentBill);
