export const discountPrice = (
  price: number,
  disc: number,
  start: Date,
  end: Date,
  quantity: number = 1,
) => {
  const now = new Date().toISOString();
  const startdate = new Date(start).toISOString();
  const enddate = new Date(end).toISOString();
  let finalPrice = price * quantity;

  //   if (!voucher_amount && !voucher_type) {
  if (!disc)
    return {
      final: finalPrice,
      tag: <div>{finalPrice.toLocaleString('id-ID')}</div>,
    };
  if (now >= startdate && now <= enddate) {
    const afterDisc = (price - disc) * quantity;
    return {
      final: afterDisc,
      tag: (
        <div className=" flex gap-2">
          <div className=" line-through text-red-500">
            {finalPrice.toLocaleString('id-ID')}
          </div>
          <div>{afterDisc.toLocaleString('id-ID')}</div>
        </div>
      ),
    };
  }
  return {
    final: finalPrice,
    tag: <div>{finalPrice.toLocaleString('id-ID')}</div>,
  };
  //   } else if (voucher_amount && voucher_type) {
  //     // if (voucher_type == 'percentage') {
  //     //   finalPrice = finalPrice - finalPrice * (voucher_amount / 100);
  //     // } else if (voucher_type == 'unit') {
  //     //   finalPrice = finalPrice - voucher_amount;
  //     // }
  //     console.log(finalPrice);

  //     if (!disc)
  //       return {
  //         final: finalPrice,
  //         tag: <div>{finalPrice.toLocaleString('id-ID')}</div>,
  //       };
  //     if (now >= startdate && now <= enddate) {
  //       const afterDisc = (price - disc) * quantity;
  //       return {
  //         final: afterDisc,
  //         tag: (
  //           <div className=" flex gap-2">
  //             <div className=" line-through text-red-500">
  //               {finalPrice.toLocaleString('id-ID')}
  //             </div>
  //             <div>{afterDisc.toLocaleString('id-ID')}</div>
  //           </div>
  //         ),
  //       };
  //     }
  // return {
  //   final: finalPrice,
  //   tag: <div>{finalPrice.toLocaleString('id-ID')}</div>,
  // };
};
