package org.example.service;

import org.example.modal.Voucher;

import java.util.List;
import java.util.Optional;

public interface IVoucherService {
    List<Voucher> getVouchers ();
    Optional<Voucher> findVoucherById(int id);
    Voucher createVoucher(Voucher voucher);
    boolean updateVoucher(int id, Voucher voucher);
    boolean updateStatusVoucher(int id, int status);
    boolean deleteVoucher(int id);
    int totalVouchers();
}
