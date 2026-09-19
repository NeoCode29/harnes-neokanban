---
name: writing-plans
description: "Gunakan untuk memecah spesifikasi fitur menjadi rangkaian task bite-sized yang dilengkapi tag spesialis dan checklist TDD."
---

# Writing Plans Skill

Skill ini mengubah spesifikasi yang disetujui menjadi rencana implementasi teknis.

## Struktur Rencana Wajib
Setiap dokumen rencana implementasi disimpan di `docs/plans/YYYY-MM-DD-<nama-fitur>.md` dan memiliki format standar:

```markdown
# [Nama Fitur] Implementation Plan

**Goal:** Ringkasan tujuan fitur.
**Specialists Involved:** [daftar peran spesialis yang terlibat]

---

### Task 1: [Judul Task Ringkas]

**Agent:** frontend-specialist   # Pilih dari tabel spesialis domain
**Priority:** HIGH              # HIGH | MEDIUM | LOW

**Files:**
- Create: `src/...`
- Modify: `src/...`
- Test: `tests/...`

**Steps:**
- [ ] **Step 1: Write the failing unit test** (RED)
- [ ] **Step 2: Implement minimal solution** (GREEN)
- [ ] **Step 3: Refactor and clean code** (REFACTOR)
- [ ] **Step 4: Verify test suite passes**
```

## Prinsip Right-Sizing
- Setiap task harus berukuran kecil (*bite-sized*), dapat diselesaikan dalam 2–5 menit.
- Jika satu task menyentuh dua domain (misal UI dan DB), pecah menjadi dua task terpisah.
